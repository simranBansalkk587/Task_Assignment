using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task_1_Assignment.Data;
using Task_1_Assignment.Repository;
using Task_1_Assignment.Repository.IRepository;

namespace Task_1_Assignment
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string cs = Configuration.GetConnectionString("constr");
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(cs));
       services.AddScoped<IUserRepository, UserRepository>();



      services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Task_1_Assignment", Version = "v1" });
            });
      // //jwt
      var appsettingSection = Configuration.GetSection("AppSettings");
      services.Configure<AppSettings>(appsettingSection);
      var appsetting = appsettingSection.Get<AppSettings>();
      var key = Encoding.ASCII.GetBytes(appsetting.Secret);
      services.AddAuthentication(u =>
      {
        u.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        u.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

      }).AddJwtBearer(u =>
      {
        u.RequireHttpsMetadata = false;
        u.SaveToken = true;
        u.TokenValidationParameters = new TokenValidationParameters()
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false

        };

      });

      services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                  builder =>
                  {
                      builder.WithOrigins("http://localhost:4200")
              .AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
                  });

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task_1_Assignment v1"));
            }
            app.UseCors("MyPolicy");
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
