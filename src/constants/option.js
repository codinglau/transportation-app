// @ts-check
// global options
export default function useOption() {
  const option = {
    busCompanies: [
      { 
        value: 'kmb', 
        label: 'constant.busCompany.kmb_lwb', 
        color: 'red-5',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/zh/thumb/3/3a/KMB_logo_%282016%29.svg/1200px-KMB_logo_%282016%29.svg.png',
      },
      { 
        value: 'nwfb', 
        label: 'constant.busCompany.nwfb',
        color: 'yellow-7',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/zh/thumb/d/d1/New_World_First_Bus.svg/200px-New_World_First_Bus.svg.png',
      },
      { 
        value: 'ctb', 
        label: 'constant.busCompany.ctb',
        color: 'teal',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/zh/thumb/9/95/Citybus.svg/177px-Citybus.svg.png',
      },
      // { 
      //   value: 'mtr', 
      //   label: 'constant.busCompany.mtr',
      //   color: 'red',
      //   imgSrc: 'https://upload.wikimedia.org/wikipedia/zh/8/8f/MTR_Logo_with_text.png',
      // },
      { 
        value: 'nlb', 
        label: 'constant.busCompany.nlb',
        color: 'light-green',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/zh/thumb/5/51/New_Lantao_Bus_Logo_%282019%29.svg/82px-New_Lantao_Bus_Logo_%282019%29.svg.png',
      },
    ],
    
    // regions
    regions: [
      { 
        value: 'hk', 
        label: '香港',
      },
      // { 
      //   value: 'tw', 
      //   label: '台灣 (Under Construction)',
      // },
    ],
  };

  return option;
}