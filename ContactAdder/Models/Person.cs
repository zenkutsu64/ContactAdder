using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations; //allows for data validation

namespace ContactAdder.Models
{
    public class Person
    {
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string MainEmail { get; set; }
    }
}