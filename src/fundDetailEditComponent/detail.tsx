import ChartComponent from "../compareComponent/lineChart";
import OverView from "./overview";

interface DetailProps {
  fund: string;
}

const Detail = ({ fund }: DetailProps) => {


  return (
    <div>
      <div className="h-full py-8 px-6 lg:px-8">
        <div className="pb-8 pt-2">
          <ChartComponent funds={[fund]} />
          <OverView fund={fund} />
        </div>
      </div>
    </div>
  )
}

export default Detail;