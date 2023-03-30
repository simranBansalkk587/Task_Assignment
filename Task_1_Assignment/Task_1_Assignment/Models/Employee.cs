using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task_1_Assignment.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int Salary { get; set; }
        public byte[] Picture { get; set; }

        public bool  IsDeleted { get; set; }


  }
}
