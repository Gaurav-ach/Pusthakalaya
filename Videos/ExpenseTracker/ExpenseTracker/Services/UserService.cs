using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using ExpenseTracker.Model;
using ExpenseTracker.Components.Model;
using ExpenseTracker.Models;

namespace ExpenseTracker.Components.Model
{
    public class UserService
    {
        // Paths for storing application data
        private static readonly string DesktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
        private static readonly string FolderPath = Path.Combine(DesktopPath, "LocalDB");
        private static readonly string FilePath = Path.Combine(FolderPath, "appdata.json");

        // To keep track of the currently logged-in user
        private static User _loggedInUser;

        // Load AppData (Users, Transactions, Debts) from JSON file
        public AppData LoadData()
        {
            if (!File.Exists(FilePath))
            {
                // If the file doesn't exist, return a new AppData object
                return new AppData();
            }

            try
            {
                // Read JSON content from the file
                var json = File.ReadAllText(FilePath);
                // Deserialize JSON into an AppData object
                return JsonSerializer.Deserialize<AppData>(json) ?? new AppData();
            }
            catch (JsonException)
            {
                // Handle corrupted JSON files gracefully
                return new AppData();
            }
            catch (Exception)
            {
                // Handle other potential errors (e.g., file access issues)
                return new AppData();
            }
        }

        // Save AppData (Users, Transactions, Debts) to JSON file
        public void SaveData(AppData data)
        {
            EnsureFolderExists();

            // Serialize AppData object into JSON
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            // Write JSON content to the file
            File.WriteAllText(FilePath, json);
        }

        // Manage Users within AppData
        public List<User> LoadUsers()
        {
            // Load AppData and return the Users list
            var appData = LoadData();
            return appData.Users;
        }

        public void SaveUsers(List<User> users)
        {
            // Load the current AppData
            var appData = LoadData();
            // Update the Users list
            appData.Users = users;
            // Save the updated AppData back to the file
            SaveData(appData);
        }

        // Hash a password securely
        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        // Validate a password against a stored hash
        public bool ValidatePassword(string inputPassword, string storedPassword)
        {
            var hashedInputPassword = HashPassword(inputPassword);
            return hashedInputPassword == storedPassword;
        }

        // Utility: Ensure the data folder exists
        private void EnsureFolderExists()
        {
            if (!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }
        }

        // Methods to manage the logged-in user

        // Get the currently logged-in user
        public User GetLoggedInUser() => _loggedInUser;

        // Set the logged-in user
        public void SetLoggedInUser(User user)
        {
            _loggedInUser = user;
        }

        // Clear the logged-in user (logout)
        public void Logout()
        {
            _loggedInUser = null;
        }

        // Method to filter and sort transactions based on search, type, tag, and sorting option
        public List<Transactions> FilterTransactions(
      List<Transactions> transactions,
      string searchQuery,
      string selectedType,
      string selectedTag,
      string sortOption)
        {
            if (transactions == null)
            {
                return new List<Transactions>();
            }

            var filteredTransactions = transactions.AsEnumerable();

            // Filter by search query (Description or Type)
            if (!string.IsNullOrEmpty(searchQuery))
            {
                filteredTransactions = filteredTransactions.Where(t =>
                    (t.Description != null && t.Description.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)) ||
                    (t.Type != null && t.Type.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)));
            }

            // Filter by selected type (Debit or Credit)
            if (!string.IsNullOrEmpty(selectedType))
            {
                filteredTransactions = filteredTransactions.Where(t => t.Type == selectedType);
            }

            // Filter by selected tag
            if (!string.IsNullOrEmpty(selectedTag))
            {
                filteredTransactions = filteredTransactions.Where(t =>
                    t.Tags != null && t.Tags.Contains(selectedTag));
            }

            // Sort based on the selected option
            if (sortOption == "Date")
            {
                filteredTransactions = filteredTransactions.OrderBy(t => t.Date);
            }
            else if (sortOption == "Debit")
            {
                filteredTransactions = filteredTransactions.OrderBy(t => t.Debit);
            }
            else if (sortOption == "Credit")
            {
                filteredTransactions = filteredTransactions.OrderBy(t => t.Credit);
            }

            return filteredTransactions.ToList();
        }
        // Method to calculate cleared debts
        public decimal CalculateClearedDebts(List<Debts> debts)
        {
            if (debts == null)
            {
                return 0;
            }

            // Sum PaidAmount of all debts that are cleared
            return debts.Where(d => d.PaidAmount >= d.Amount).Sum(d => d.PaidAmount);
        }

        // Method to get pending debts
        public List<Debts> GetPendingDebts(List<Debts> debts)
        {
            if (debts == null)
            {
                return new List<Debts>();
            }

            // Filter debts that are not cleared, sorted by DueDate
            return debts.Where(d => d.PaidAmount < d.Amount).OrderBy(d => d.DueDate).ToList();
        }

    }

}

