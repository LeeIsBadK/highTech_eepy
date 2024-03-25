import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/search';
import Fund from '../Components/fund';

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
    href: '#',
    risk: 6,
    type: 'SSFEQ',
    value: 8.4301,
    returns: 138.70
  },
  {
    id: 2,
    name: 'ASP-DIGIBLOCRMF',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการเลี้ยงชีพ',
    href: '#',
    risk: 6,
    type: 'RMFEQ',
    value: 7.7214,
    returns: 130.12
  },
  {
    id: 3,
    name: 'ASP-DIGIBLOC',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน',
    href: '#',
    risk: 6,
    type: 'FIFEQ',
    value: 7.4037,
    returns: 125.88
  },
  {
    id: 4,
    name: 'LHBLOCKCHAIN',
    detail: 'กองทุนเปิด แอล เอช บล็อกเชน',
    href: '#',
    risk: 6,
    type: 'MIXFLEX',
    value: 9.8522,
    returns: 81.36
  },
  {
    id: 5,
    name: 'SCBSEMI(SSFE)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดเพื่อการออมผ่านช่องทางอิเล็กทรอนิกส์)',
    href: '#',
    risk: 7,
    type: 'SSFEQ',
    value: 15.5487,
    returns: 77.20
  },
  {
    id: 6,
    name: 'SCBSEMI(E)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดช่องทางอิเล็กทรอนิกส์)',
    href: '#',
    risk: 7,
    type: 'RMFEQ',
    value: 15.7053,
    returns: 77.17
  },
  {
    id: 7,
    name: 'SCBSEMI(P)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดผู้ลงทุนกลุ่ม/บุคคล)',
    href: '#',
    risk: 7,
    type: 'FIFEQ',
    value: 15.2816,
    returns: 75.52
  },
  {
    id: 8,
    name: 'KT-BLOCKCHAIN-A',
    detail: 'กองทุนเปิดเคแทม Blockchain Economy (ชนิดสะสมมูลค่า)',
    href: '#',
    risk: 6,
    type: 'FIFEQ',
    value: 10.7280,
    returns: 73.10
  },
  {
    id: 9,
    name: 'TNEXTGEN-SSF',
    detail: 'กองทุนเปิด ทิสโก้ Next Generation Internet ชนิดหน่วยลงทุนเพื่อการออม',
    href: '#',
    risk: 6,
    type: 'SSFEQ',
    value: 6.5763,
    returns: 64.94
  },
  {
    id: 10,
    name: 'KKP TECH-H-SSF',
    detail: 'กองทุนเปิดเคเคพี EXPANDED TECH - HEDGED ชนิดเพื่อการออม',
    href: '#',
    risk: 7,
    type: 'SSFEQ',
    value: 15.1590,
    returns: 63.65
  }
]

const DashboardPage = () => {
  
    return (
        <div className="flex"
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <Sidebar />
          <div className="w-full pl-2 pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12 items-center bg-gray-100 max-h-[100vh] overflow-y-auto">
            <div className="pl-8">
              <div className='flex max-w-2xl px-2 pb-4 mt-1 sm:px-6 sm:pb-8 sm:mt-2 lg:max-w-7xl lg:px-8 lg:pb-12'>
                <h2 className="text-4xl font-bold tracking-tight text-[#072C29]">Dashboard</h2>
                <div className="ml-auto mr-auto">
                  <SearchBar funds={fundData as Fund[]} />
                </div>
              </div>
            </div>
            <Fund funds={fundData as Fund[]}/>
          </div>
        </div>
      );
}

export default DashboardPage;