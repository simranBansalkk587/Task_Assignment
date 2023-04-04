using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Task_1_Assignment.Data;
using Task_1_Assignment.Models;

namespace Task_1_Assignment.Controllers
{
    [Route("api/employee")]
    [ApiController]
    [Authorize]

  public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetEmployee()
        {
            //return Ok(_context.Employees.ToList());
            var empInDb = _context.Employees.Where(n => !n.IsDeleted);
            return Ok(empInDb);
        }
        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            var empInDb = _context.Employees.Find(id);
            if (empInDb == null) return NotFound();
            return Ok(empInDb);
        }
        [HttpPost]
        public IActionResult SaveEmployee([FromBody]Employee employee)
        {   
          if(employee !=null && ModelState.IsValid)
          {
        //var files = HttpContext.Request.Form.Files;
        //if (files.Count > 0)
        //{
        //  byte[] p1 = null;
        //  using (var fs1 = files[0].OpenReadStream())
        //  {
        //    using (var ms1 = new MemoryStream())
        //    {
        //      fs1.CopyTo(ms1);
        //      p1 = ms1.ToArray();
        //    }
        //  }
          //employee.Picture = p1;
        
        _context.Employees.Add(employee);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut]
        public IActionResult UpdateEmployee([FromBody]Employee employee)
        {
            if (employee != null && ModelState.IsValid)
            {
                _context.Employees.Update(employee);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
    //[HttpDelete("{id:int}")]
    //public IActionvoiResult deleteEmployee(int id)
    //{
    //    ////var empInDb = _context.Employees.Find(id);
    //    ////if (empInDb == null) return NotFound();
    //    ////_context.Employees.Remove(empInDb);
    //    ///
    //    ////_context.SaveChanges();
    //    ////return Ok();
    //    //Employee empInDb = _context.Employees.Find(id);
    //    //if(empInDb==null)
    ////    //{
    //    return NotFound();
    //}
    //empInDb.IsDeleted = true;
    //_context.SaveChanges();
    //return Ok();
    [HttpDelete]
    public void Delete(int id)
    {
      var empInDb = _context.Employees.FirstOrDefault(s => s.Id == id &&  !s.IsDeleted);
      if (empInDb != null)
        _context.Remove(empInDb);
      _context.SaveChanges();

    }
  //  [HttpPost]
  //  public IActionResult Upload(Employee employee)
  //  {
  //    var files = HttpContext.Request.Form.Files;
  //    if (files.Count > 0)
  //    {
  //      byte[] p1 = null;
  //      using (var fs1 = files[0].OpenReadStream())
  //      {
  //        using (var ms1 = new MemoryStream())
  //        {
  //          fs1.CopyTo(ms1);
  //          p1 = ms1.ToArray();
  //        }
  //      }
  //      employee.Picture = p1;
  //    }
  //    _context.SaveChanges();
  //    re


  }


}
