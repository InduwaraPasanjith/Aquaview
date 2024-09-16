using crud_dotnet_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace crud_dotnet_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly PlantRepository _plantRepository;

        public PlantController(PlantRepository plantRepository)
        {
            _plantRepository = plantRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddPlant([FromBody] Plant model)
        {
            await _plantRepository.AddPlantAsync(model);
            return Ok();
        }

        [HttpGet]

        public async Task<ActionResult> GetPlantList()
        {
            var employeeList = await _plantRepository.GetAllPlantAsync();
            return Ok(employeeList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetPlantById([FromRoute] int id)
        {
            var employee = await _plantRepository.GetPlantByIdAsync(id);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePlant([FromRoute] int id, [FromBody] Plant model)
        {
            await _plantRepository.UpdatePlantAsync(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlant([FromRoute] int id)
        {
            await _plantRepository.DeletePlantAsnyc(id);
            return Ok();
        }
    }
}
