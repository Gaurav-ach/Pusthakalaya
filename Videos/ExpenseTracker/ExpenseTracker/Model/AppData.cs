using System;
using System.Collections.Generic;
using ExpenseTracker.Model;
using ExpenseTracker.Models;

namespace ExpenseTracker.Components.Model
{
    public class AppData
    {
        public List<User> Users { get; set; } = new List<User>();
        public List<Transactions> Transactions { get; set; } = new List<Transactions>();
        public List<Debts> Debts { get; set; } = new List<Debts>();
    }
}
 