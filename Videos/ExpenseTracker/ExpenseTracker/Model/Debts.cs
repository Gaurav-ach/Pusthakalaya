namespace ExpenseTracker.Models
{
    public class Debts
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Link debt to a user
        public decimal Amount { get; set; } // Total debt amount
        public decimal PaidAmount { get; set; } // Amount paid towards debt
        public DateTime Date { get; set; } // Date when the debt was recorded
        public string Description { get; set; } // Description of the debt
        public DateTime DueDate { get; set; } // Due date for the debt
    }
}
