using crud_dotnet_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace crud_dotnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterQualityController : ControllerBase
    {

        private readonly WaterQualityRepository _waterQuality;

        public WaterQualityController(WaterQualityRepository waterQuality)
        {
            _waterQuality = waterQuality;
        }

        [HttpPost("predict")]
        public async Task<IActionResult> PredictWaterQuality([FromBody] WaterQuality request)
        {
            var result = await _waterQuality.PredictWaterQuality(request);

            if (result.Contains("Error") || result.Contains("Exception"))
            {
                return StatusCode(500, result);
            }

            return Ok(result);
        }
    }
}
