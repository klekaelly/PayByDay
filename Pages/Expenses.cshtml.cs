using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PayByDay.Data;
using PayByDay.Models;
using System.Security.Claims;

namespace PayByDay.Pages
{
    public class Expenses : PageModel
    {
        private readonly ApplicationDbContext _context;

        public List<Expense> Expenses1 { get; set; } = new List<Expense>();

        [BindProperty] public Expense NewExpense { get; set; }

        public Expenses(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task OnGetAsync()
        {
            Expenses1 = await _context.Expenses.ToListAsync();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                ModelState.AddModelError(string.Empty, "User ID is null or empty.");
                return Page();
            }

            NewExpense.OwnerId = userId;

            ModelState.Clear(); // Clear existing model state errors
            TryValidateModel(NewExpense);

            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Expenses.Add(NewExpense);
            await _context.SaveChangesAsync();

            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense != null)
            {
                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage();
        }
    }
}