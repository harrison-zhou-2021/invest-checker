using InvestCalcService.Dtos;
using InvestCalcService.Dtos.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace InvestCalcService.Services
{
    public class ExchangeRateService : IExchangeRateService
    {
        private readonly IHttpClientFactory clientFactory;

        public ExchangeRateService(IHttpClientFactory clientFactory)
        {
            this.clientFactory = clientFactory;
        }

        public async Task<decimal> GetExchangeRate(CurrencyEnum from, CurrencyEnum to)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://v6.exchangerate-api.com/v6/823087b3653907f793d5c90f/pair/{from.ToString()}/{to.ToString()}");
            var client = this.clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var exchangeRate = JsonConvert.DeserializeObject<ExchangeRateResponseDto>(content);
                return exchangeRate.ConversionRate;
            }
            else
            {
                throw new Exception("Fetch exchange rate failed.");
            }
        }
    }
}
