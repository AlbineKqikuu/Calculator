using Microsoft.AspNetCore.Mvc;

namespace Calculator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Calculate([FromBody] CalculationRequest request)
        {
            try
            {
                double result = 0;
                double firstNumber = double.Parse(request.FirstNumber);
                double secondNumber = double.Parse(request.SecondNumber);

                switch (request.Operation)
                {
                    case "+":
                        result = firstNumber + secondNumber;
                        break;
                    case "-":
                        result = firstNumber - secondNumber;
                        break;
                    case "*":
                        result = firstNumber * secondNumber;
                        break;
                    case "/":
                        if (secondNumber == 0)
                        {
                            return Json(new { success = false, message = "Cannot divide by zero!" });
                        }
                        result = firstNumber / secondNumber;
                        break;
                    case "^":
                        result = Math.Pow(firstNumber, secondNumber);
                        break;
                    case "√":
                        if (firstNumber < 0)
                        {
                            return Json(new { success = false, message = "Cannot calculate square root of negative number!" });
                        }
                        result = Math.Sqrt(firstNumber);
                        break;
                    default:
                        return Json(new { success = false, message = "Invalid operation!" });
                }

                return Json(new { success = true, result = result.ToString("F8").TrimEnd('0').TrimEnd('.') });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Invalid input! Please check your numbers." });
            }
        }

        public IActionResult Error()
        {
            return View();
        }
    }

    public class CalculationRequest
    {
        public string FirstNumber { get; set; } = "";
        public string SecondNumber { get; set; } = "";
        public string Operation { get; set; } = "";
    }
} 