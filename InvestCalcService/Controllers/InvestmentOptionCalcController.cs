using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestCalcService.Dtos;
using InvestCalcService.Dtos.Common;
using InvestCalcService.Services;
using InvestmentCalcService.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InvestCalcService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestmentOptionCalcController : ControllerBase
    {
        private readonly IInvestmentOptionCalcService investmentOptionCalcService;
        private readonly IExchangeRateService exchangeRateService;

        public InvestmentOptionCalcController(IInvestmentOptionCalcService investmentOptionCalcService, IExchangeRateService exchangeRateService )
        {
            this.investmentOptionCalcService = investmentOptionCalcService;
            this.exchangeRateService = exchangeRateService;
        }


        [HttpPost]
        public async Task<InvestmentCalcResponseDto> CalculateRoi([FromBody] InvestmentOptionRequestDto request)
        {
            var roiResult = this.investmentOptionCalcService.getRoiFee(request.InvestmentAmount, request.InvestmentOptions);
            var exchangeRate = await this.exchangeRateService.GetExchangeRate(CurrencyEnum.AUD, CurrencyEnum.USD);
            return new InvestmentCalcResponseDto()
            {
                ProjectedReturnInAud = roiResult.Roi,
                TotalFeesInAud = roiResult.Fee,
                TotalFeesInUsd = roiResult.Fee * exchangeRate,
            };
            

        }
    }
}
