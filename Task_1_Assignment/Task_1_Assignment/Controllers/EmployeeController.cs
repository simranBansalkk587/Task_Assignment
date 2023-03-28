using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task_1_Assignment.Data;
using Task_1_Assignment.Models;

namespace Task_1_Assignment.Controllers
{
    [Route("api/employee")]
    [ApiController]
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


  }
}
