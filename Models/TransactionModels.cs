using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayByDay.Models;

public enum Frequency
{
    Daily,
    Weekly,
    BiWeekly,
    Monthly,
    BiMonthly,
    Quarterly,
    SemiAnnually,
    Annually,
    Biennially
}

public abstract class TransactionBase
{
    [Key] public int Id { get; set; }

    [Required] [ForeignKey("Owner")] public string OwnerId { get; set; } = string.Empty;

    [Required] public string Name { get; set; } = string.Empty;

    [Required] public DateTime Date { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }
}

public class Purchase : TransactionBase
{
    // No additional properties needed for now
}

public class Goal : TransactionBase
{
    [Required] public DateTime NeedByDate { get; set; }
}

public class Expense : TransactionBase
{
    [Required] public Frequency Frequency { get; set; }

    [Required] public DateTime DateOfLastOccurrence { get; set; }
}