namespace ExpenseTracker.Model
{
    public class Transactions
    {
        public int Id { get; set; }
        public decimal Debit { get; set; } // Debit amount
        public decimal Credit { get; set; } // Credit amount
        public DateTime Date { get; set; } // Transaction date
        public string Description { get; set; } // Description of the transaction
        public List<string> Tags { get; set; } = new List<string>(); // Associated tags

        // Type of transaction (e.g., Debit, Credit, Expense, etc.)
        public string Type { get; set; }

        // New property: Tracks whether the transaction is cleared
        public bool IsCleared { get; set; } = false;

        // New property: Note for additional information (Optional)
        public string Note { get; set; } // Added the Note property

        // Default constructor
        public Transactions()
        {
            Date = DateTime.Now; // Default to the current date
        }
    }
}
