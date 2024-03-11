const Fund = ({funds}: { funds: Array<any> }) => {
    return (
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-6 sm:px-6 sm:py-9 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
              {funds.map((fund) => (
                <div key={fund.id} className="group relative flex">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">

                  </div>
                  <div className="h-full w-full flex justify-between">
                    <div className="mt-4 ml-3 w-full">
                      <div className="w-full flex items-center">
                        <h3 className="flex items-start text-[20px] font-bold text-gray-700">
                          <a href={fund.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {fund.name}
                          </a>
                        </h3> 
                        <div className="ml-auto">
                          <p className="text-md font-medium text-gray-900">{fund.value}</p>
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className={`px-3 py-1 border border-2  rounded-md border-riskColor${fund.risk}`}
                          >
                          <p className={`text-[24px] font-bold text-riskColor${fund.risk}`}>{fund.risk}</p>
                          
                        </div>
                        <div className="ml-3 px-3 py-1 border border-gray-300 border-2 items-center rounded-md">
                          <p className="justify-center items-center text-[24px] font-bold text-gray-600">{fund.type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default Fund;
