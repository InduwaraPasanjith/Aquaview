
using Newtonsoft.Json;
using System;
using System.Text;
using System.Text.Json;

namespace crud_dotnet_api.Data
{
    public class WaterQualityRepository
    {

        private readonly AppDbContext _appDbContext;
        private readonly System.Net.Http.HttpClient _httpClient;

        public WaterQualityRepository(AppDbContext appDbContext, System.Net.Http.HttpClient httpClient)
        {
            _appDbContext = appDbContext;
            _httpClient = httpClient;
        }

        public async Task<string> PredictWaterQuality(WaterQuality request)
        {
            string apiUrl = "http://127.0.0.1:8000/predict/";

            // Prepare the post data with the required fields
            var postData = new
            {
                pH = request.pH,
                temperature = request.temperature,
                Chlorine = request.Chlorine,
                COD = request.COD,
                TSS = request.TSS,
            };

            // Serialize the post data to JSON
            string json = JsonConvert.SerializeObject(postData);

            // Use HttpClient to send the request
            using (HttpClient client = new HttpClient())
            {
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                try
                {
                    HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                    // Check if the response is successful
                    if (response.IsSuccessStatusCode)
                    {
                        // Read and return the response content as a string
                        string result = await response.Content.ReadAsStringAsync();
                        return result;
                    }
                    else
                    {
                        // Log the error and return a descriptive error message
                        string errorContent = await response.Content.ReadAsStringAsync();
                        return $"Error: {response.StatusCode}, Reason: {response.ReasonPhrase}, Content: {errorContent}";
                    }
                }
                catch (Exception ex)
                {
                    // Return an error message in case of an exception
                    return $"Exception: {ex.Message}";
                }
            }
        }

    }
}
