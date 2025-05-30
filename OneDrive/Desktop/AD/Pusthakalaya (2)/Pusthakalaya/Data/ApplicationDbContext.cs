﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pusthakalaya.Models;

namespace Pusthakalaya.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Whitelist> Whitelists { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<TimedDiscount> TimedDiscounts { get; set; }
        public DbSet<BookLoan> BookLoans { get; set; }
        public DbSet<TimedAnnouncement> TimedAnnouncements { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Cart with composite key
            builder.Entity<Cart>()
                .HasKey(c => new { c.UserId, c.BookId });

            // Configure Whitelist with composite key
            builder.Entity<Whitelist>()
                .HasKey(w => new { w.UserId, w.BookId });

            // Configure Order with composite key
            builder.Entity<Order>()
                .HasKey(o => new { o.UserId, o.BookId, o.OrderDate });

            // Configure Review with single Id as primary key
            builder.Entity<Review>()
                .HasKey(r => r.Id);

            // Configure self-referencing relationship for Review
            builder.Entity<Review>()
                .HasOne(r => r.ParentReview)
                .WithMany(r => r.Replies)
                .HasForeignKey(r => r.ParentReviewId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Book-Review relationship
            builder.Entity<Review>()
                .HasOne(r => r.Book)
                .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Review-User relationship
            builder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure TimedDiscount
            builder.Entity<TimedDiscount>()
                .HasOne(td => td.Book)
                .WithMany()
                .HasForeignKey(td => td.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure BookLoan with composite key
            builder.Entity<BookLoan>()
                .HasKey(bl => new { bl.UserId, bl.BookId, bl.LoanDate });

            // Configure BookLoan relationships
            builder.Entity<BookLoan>()
                .HasOne(bl => bl.User)
                .WithMany()
                .HasForeignKey(bl => bl.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<BookLoan>()
                .HasOne(bl => bl.Book)
                .WithMany()
                .HasForeignKey(bl => bl.BookId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure TimedAnnouncement
            builder.Entity<TimedAnnouncement>()
                .HasKey(ta => ta.Id);

            // Ignore the Roles property on ApplicationUser
            builder.Entity<ApplicationUser>()
                .Ignore(u => u.Roles);
        }
    }
}