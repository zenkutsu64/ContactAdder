using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactAdder.Models
{
    public class RelationalDatabase
    {
        // properties and methods of the class
        public string DatabaseType { get; set; } //MySQL, SQLite, MS SQL Server, Act!, etc...
        public string LoginPath { get; set; }
        //public bool Authenticate() { }

    }
}