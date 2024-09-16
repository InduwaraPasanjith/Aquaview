using crud_dotnet_api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace crud_dotnet_api.Data
{
    public class PlantRepository
    {

        private readonly AppDbContext _appDbContext;

        public PlantRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;

        }

        public async Task AddPlantAsync(Plant plant)
        {
            try
            {
                await _appDbContext.Set<Plant>().AddAsync(plant);
                await _appDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        public async Task<List<Plant>> GetAllPlantAsync()
        {
            return await _appDbContext.Plants.ToListAsync();
        }

        public async Task<Plant> GetPlantByIdAsync(int id)
        {
            return await _appDbContext.Plants.FindAsync(id);
        }

        public async Task UpdatePlantAsync(int id, Plant model)
        {
            var plant = await _appDbContext.Plants.FindAsync(id);
            if (plant == null)
            {
                throw new Exception("Plant not found");
            }
            plant.Name = model.Name;
            plant.Address = model.Address;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeletePlantAsnyc(int id)
        {
            var plant = await _appDbContext.Plants.FindAsync(id);
            if (plant == null)
            {
                throw new Exception("Plant not found");
            }
            _appDbContext.Plants.Remove(plant);
            await _appDbContext.SaveChangesAsync();
        }

        
    }
}
