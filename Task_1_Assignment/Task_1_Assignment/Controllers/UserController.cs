using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Task_1_Assignment.Models;
using Task_1_Assignment.Repository.IRepository;

namespace Task_1_Assignment.Controllers
{
  [Route("api/user")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly IUserRepository _userRepository;
    public UserController(IUserRepository userRepository)
    {
      _userRepository = userRepository;
    }
    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
      
      if (ModelState.IsValid)
      {
        var IsUniqueuser = _userRepository.IsUniqueUser(user.UserName);
        if (!IsUniqueuser)
          return BadRequest("User in already exists");
        var UserInInfo = _userRepository.Register(user.UserName, HashPassword(user.Password));
        if (UserInInfo == null) return BadRequest();
      }
      return Ok();
        // if(UserInInfo ! =null && user.Password==HashPassword)

        //  if (user != null && user.Password == HashPassword(user.Password))
        //  {
        //    return Ok(user);
        //  }
        //  else
        //  {
        //    return NotFound(user);
        //  }
        //}
        //return Ok();
    }
    public static string HashPassword(string password)
    {
      using (var sha256 = SHA256.Create())
      {
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        return hash;
      }
    }
    [HttpPost("authenticate")]

    public IActionResult Authenticate([FromBody] UserVM userVM)
    {
      var user = _userRepository.Authenticate(userVM.UserName, HashPassword(userVM.Password));
      if (user == null) return BadRequest("Wrong User/Password");
      return Ok(user.Token);
    }
  }
}
