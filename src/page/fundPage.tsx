import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/search';
import Fund from '../Components/fund';
import Favorite from '../Components/favorite';

interface Fund {
    id: number;
    name: string;
    detail: string;
    href: string;
    risk: number;
    type: string;
    value: number;
    returns: number;
  }
  
  export const fundData = [
    {
      id: 1,
      name: 'ASP-DIGIBLOC-SSF',
      detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการออม',
      href: '/fund/ASP-DIGIBLOC-SSF',
      risk: 6,
      type: 'SSFEQ',
      value: 8.4301,
      returns: 138.70
    },
    {
      id: 2,
      name: 'ASP-DIGIBLOCRMF',
      detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการเลี้ยงชีพ',
      href: '/fund/ASP-DIGIBLOCRMF',
      risk: 1,
      type: 'RMFEQ',
      value: 7.7214,
      returns: 130.12
    },
    {
      id: 3,
      name: 'ASP-DIGIBLOC',
      detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน',
      href: '/fund/ASP-DIGIBLOC',
      risk: 3,
      type: 'FIFEQ',
      value: 7.4037,
      returns: 125.88
    },
    {
      id: 4,
      name: 'LHBLOCKCHAIN',
      detail: 'กองทุนเปิด แอล เอช บล็อกเชน',
      href: '/fund/LHBLOCKCHAIN',
      risk: 2,
      type: 'MIXFLEX',
      value: 9.8522,
      returns: 81.36
    },
    {
      id: 5,
      name: 'SCBSEMI(SSFE)',
      detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดเพื่อการออมผ่านช่องทางอิเล็กทรอนิกส์)',
      href: '/fund/SCBSEMI(SSFE)',
      risk: 4,
      type: 'SSFEQ',
      value: 15.5487,
      returns: 77.20
    },
    {
      id: 6,
      name: 'SCBSEMI(E)',
      detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดช่องทางอิเล็กทรอนิกส์)',
      href: '/fund/SCBSEMI(E)',
      risk: 5,
      type: 'RMFEQ',
      value: 15.7053,
      returns: 77.17
    },
    {
      id: 7,
      name: 'SCBSEMI(P)',
      detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดผู้ลงทุนกลุ่ม/บุคคล)',
      href: '/fund/SCBSEMI(P)',
      risk: 7,
      type: 'FIFEQ',
      value: 15.2816,
      returns: 75.52
    },
    {
      id: 8,
      name: 'KT-BLOCKCHAIN-A',
      detail: 'กองทุนเปิดเคแทม Blockchain Economy (ชนิดสะสมมูลค่า)',
      href: '/fund/KT-BLOCKCHAIN-A',
      risk: 6,
      type: 'FIFEQ',
      value: 10.7280,
      returns: 73.10
    },
    {
      id: 9,
      name: 'TNEXTGEN-SSF',
      detail: 'กองทุนเปิด ทิสโก้ Next Generation Internet ชนิดหน่วยลงทุนเพื่อการออม',
      href: '/fund/TNEXTGEN-SSF',
      risk: 8,
      type: 'SSFEQ',
      value: 6.5763,
      returns: 64.94
    },
    {
      id: 10,
      name: 'KKP TECH-H-SSF',
      detail: 'กองทุนเปิดเคเคพี EXPANDED TECH - HEDGED ชนิดเพื่อการออม',
      href: '/fund/KKP TECH-H-SSF',
      risk: 1,
      type: 'SSFEQ',
      value: 15.1590,
      returns: 63.65
    }
  ]

const FundPage = () => {
  /*const [fundData2, setFundData2] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/filter/product?searchString=Viet&take=20&skip=&orderBy=asc');
        setFundData2(response.data); // Assuming the API response is an array of fund objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(fundData2);*/

    return (
        <div className="flex"
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <Sidebar />
          <div className="w-full pl-2 pt-4 sm:pt-7 lg:pt-11 pb-4 sm:pb-8 lg:pb-12 items-center bg-[#f9f9f9] max-h-[100svh] overflow-y-auto">
            <div className='px-2 pb-4 mt-1 sm:px-4 sm:pb-8 sm:mt-2 lg:px-7 lg:pb-12'>
              <div className="px-6 flex items-center">
                <h2 className="sm:text-[22px] md:text-[26px] lg:text-[32px] pr-4 font-bold tracking-tight text-[#072C29]">รายละเอียดกองทุน</h2>
                <div className="ml-auto mr-auto">
                  <SearchBar funds={fundData as Fund[]}/>
                </div>
                <div className="ml-auto px-4">
                  <Favorite />
                </div>
              </div>
            </div>
            <Fund funds={fundData as Fund[]}/>
          </div>
        </div>
      );
}

export default FundPage;