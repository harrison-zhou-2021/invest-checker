using InvestCalcService.Dtos.Common;
using InvestmentCalcService.Dtos.Common;
using System.Collections.Generic;

namespace InvestCalcService.Services
{
    public interface IInvestmentOptionCalcService
    {
        RoiFeeResult getRoiFee(decimal investmentAmount, List<InvestmentOptionDtoItem> options);
    }
}
