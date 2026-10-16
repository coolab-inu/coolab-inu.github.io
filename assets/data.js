/* Lab content, transcribed from https://sites.google.com/view/coolabinu. Edit here; every page reads from this file.
   Photos live in assets/img/ and were taken from the same site. */

const PEOPLE = [
  {
    "id": "phd",
    "group": "Doctor of Philosophy (Ph.D.) Students",
    "note": "PART-TIME",
    "list": [
      {
        "en": "Samuel Lee",
        "kr": "이사무엘",
        "mail": "leesm@changnam.com",
        "areas": [
          "Motor Control Systems: BLDC/PMSM Sensorless",
          "Embedded Systems: Firmware & Hardware Development",
          "Power & Hardware Design: Circuit Design",
          "Process Standards: Automotive SPICE (A-SPICE)"
        ],
        "plats": [
          "PMSM/BLDC Controller Custom Board Design & Debugging",
          "Infineon MCU, Embedded C IDE (GCC, Arm Compiler)"
        ],
        "photo": "member-samuel-lee.jpg"
      }
    ]
  },
  {
    "id": "ms",
    "group": "Master of Science (M.S.) Students",
    "note": "PART-TIME",
    "list": [
      {
        "en": "Jihoon Jung",
        "kr": "정지훈",
        "mail": "wldlgns@gmail.com",
        "areas": [
          "Embedded System Design",
          "Motor Control and Drive Systems",
          "Sensor Signal Processing",
          "Automotive Semiconductor Applications"
        ],
        "plats": [
          "MCU-Based Motor Control Systems",
          "Automotive Sensor Evaluation Platforms"
        ],
        "photo": "member-jihoon-jung.jpg"
      }
    ]
  },
  {
    "id": "ug",
    "group": "Undergraduate Internship",
    "note": "",
    "list": [
      {
        "en": "Juchan Kim",
        "kr": "김주찬",
        "mail": "5701042@stu.kmu.ac.kr",
        "plats": [
          "PMSM",
          "Robot manipulator"
        ],
        "photo": "member-juchan-kim.jpg"
      },
      {
        "en": "Jeeun Ryu",
        "kr": "류제은",
        "mail": "5701060@stu.kmu.ac.kr",
        "plats": [
          "PMSM",
          "Robot manipulator"
        ],
        "photo": "member-jeeun-ryu.jpg"
      },
      {
        "en": "Donghyun Cho",
        "kr": "조동현",
        "mail": "5701363@stu.kmu.ac.kr",
        "plats": [
          "PMSM",
          "Robot manipulator"
        ],
        "photo": "member-donghyun-cho.jpg"
      },
      {
        "en": "Seongwoo Do",
        "kr": "도성우",
        "mail": "5879827@stu.kmu.ac.kr",
        "plats": [
          "Quadrotor UAVs"
        ],
        "photo": "member-seongwoo-do.jpg"
      },
      {
        "en": "Taeyong Lee",
        "kr": "이태용",
        "mail": "leexz0413@inu.ac.kr",
        "plats": [
          "PMSM",
          "Robot manipulator"
        ],
        "photo": "member-taeyong-lee.jpg"
      }
    ]
  }
];
const UG_AREAS = ["Nonlinear Control Systems","Dynamic System Modeling","Control System Design"];

/* [name, korean name, now, photo, organisation logo] */
const ALUMNI = [
  ["Rai Divat","라이 디바트","Engineer at ROUNDED K","alumni-rai-divat.jpg","org-rounded-k.png"],
  ["JaeWoong Song","송재웅","Intern at Hanwha Qcells","alumni-jaewoong-song.jpg","org-hanwha-qcells.png"],
  ["Jaewon Kwon","권재원","B.S. Student at Keimyung University","alumni-jaewon-kwon.jpg","org-keimyung-university.png"],
  ["Minsoo Park","박민수","B.S. Student at Keimyung University","alumni-minsoo-park.jpg","org-keimyung-university.png"],
  ["Kangmin Kim","김강민","B.S. Student at Keimyung University","alumni-kangmin-kim.jpg","org-keimyung-university.png"]
];

/* [no, authors, title, venue, doi, year, IF, JCR top %] */
const PUBS = [
  [25,"Jaeyun Yim, Junyeob Kim, Jeonghwan Gil, Sesun You, Frede Blaabjerg, Youngwoo Lee, Yonghao Gui, Wonhee Kim","Improved PV System Control Strategies to Reduce Power Management Costs in Nanogrids","IEEE Transactions on Sustainable Energy, vol. 17, no. 2, pp. 1059-1074, April 2026","10.1109/TSTE.2025.3606239",2026,"10.3",16.5],
  [24,"Gwanyeon Kim, Jonggeon Lim, Sesun You, Youngwoo Lee, Daehee Won, Yonghao Gui, Wonhee Kim*","Multilevel Conditional Disturbance Rejection Control for Satellite Attitude Tracking","IEEE Transactions on Aerospace and Electronic Systems, vol. 62, pp. 10234-10247, 2026","10.1109/TAES.2026.3689800",2026,"7.0",5.9],
  [23,"Junggyu Hwang, Sangshin Park, Myoung Hoon Lee, Sesun You* (Corresponding Author)","Real-Time Mass Estimation of Commercial Trucks Using a Wheel-Dynamics-Based Disturbance Observer with Data-Driven Parameter Optimization","Electronics 15 (17), 3859, 2026","",2026,"2.9",null],
  [22,"Eunji Lee, Yonghao Gui, Sesun You (Co-Corresponding Author), Jun Moon, and Wonhee Kim*","Extended State Observer-Based Robust Model Predictive Velocity Control for Permanent Magnet Synchronous Motor","IEEE Access, vol. 13, pp. 60602–60612, 2025","",2025,"3.4",34.4],
  [21,"Jaeyun Yim, Sesun You, Kwankyun Byeon, Yonghao Gui, Youngwoo Lee, and Wonhee Kim*","Spike-Free Adaptive Sliding Mode Control: Application to Permanent Magnet Synchronous Motors","IEEE Transactions on Industrial Electronics, 2025","10.1109/TIE.2025.3574392",2025,"7.2",5],
  [20,"Sesun You (Sole Author)","Adaptive Learning Gain-Based Robust Attitude Control for Satellites with Time-Varying External Disturbances","Electronics, 2025","10.3390/electronics14163298",2025,"2.6",null],
  [19,"Sesun You (first Author), K. Byeon, J. Seo, W. Kim and M. Tomizuka","Policy-Iteration-Based Active Disturbance Rejection Control for Uncertain Nonlinear Systems With Unknown Relative Degree","IEEE Transactions on Cybernetics, vol. 55, no. 3, pp. 1347-1358, March 2025","",2025,"9.4",4.2],
  [18,"Jinyoung Lee, Sesun You (Co-first Author), Wonhee Kim, and Jun Moon","Extended state observer-actor–critic architecture based output-feedback optimized backstepping control for permanent magnet synchronous motors","Expert Systems with Applications, Volume 270, 2025, 126542","",2025,"7.5",6.9],
  [17,"Jinwoo Ha, Sesun You (Co-first Author), Young-jin Ko and Wonhee Kim","Extremum Seeking-based Braking Friction Force Maximization Algorithm using Fuzzy logic without Slip Ratio for ABSs","IEEE Transactions on Intelligent Vehicles, vol. 9, no. 8, pp. 5272-5283, Aug. 2024","",2024,"14",1.3],
  [16,"Jaeyun Yim, Sesun You, Frede Blaabjerg, Youngwoo Lee*, Yonghao Gui*, and Wonhee Kim*","Cascaded Structure Energy Management Systems Using Hybrid Energy Storage System in Nanogrid","Renewable Energy, Vol. 221, 2024, 119744, ISSN 0960-1481","",2024,"9",14.7],
  [15,"Kwankyun Byeon, Sesun You, Youngwoo Lee, Sungho Kim, Donghyun Kang, Jongwon Choi, and Wonhee Kim*","Robust Arbitrary-Time Path-Tracking Control Using Reduced Order Kinematic Model for Unmanned Ground Vehicles","IEEE Transactions on Intelligent Transportation Systems, vol. 25, no. 5, pp. 4089-4101, May 2024","",2024,"7.9",6.4],
  [14,"Gwanyeon Kim, Sesun You, Sangjun Lee, Donghoon Shin, and Wonhee Kim*","Robust Nonlinear Torque Control Using Steering Wheel Torque Model for Electric Power Steering Systems","IEEE Transactions on Vehicular Technology, vol. 72, no. 7, pp. 9555-9560, July 2023","",2023,"6.1",12.6],
  [13,"Jaehyoung Gu, Sesun You (Co-first Author), and Wonhee Kim*, Jun Moon*","Fuzzy Event-Triggered Super Twisting Sliding Mode Control for Position Tracking of Permanent Magnet Synchronous Motors under Unknown Disturbances","IEEE Transactions on Industrial Informatics, vol. 19, no. 9, pp. 9843-9854, 2023","",2023,"11.7",1.5],
  [12,"Sesun You (first Author), Gwanyeon Kim, Sangjun Lee, Donghoon Shin, and Wonhee Kim*","Neural Approximation-based Adaptive Control using Reinforced Gain for Steering Wheel Torque Tracking of Electric Power Steering System","IEEE Transactions on Systems, Man, and Cybernetics: Systems, vol. 53, no. 7, pp. 4216-4225, 2023","",2023,"8.6",5.4],
  [11,"Sesun You (first Author) and Wonhee Kim*","Adaptive Learning Gain-Based Control for Nonlinear Systems with External Disturbances: Application to PMSM","IEEE Transactions on Control Systems Technology, vol. 31, no. 3, pp. 1427-1434, 2023","",2023,"4.9",19.4],
  [10,"Jaeyun Yim, Sesun You, Youngwoo Lee*, and Wonhee Kim*","Chattering Attenuation Disturbance Observer for Sliding Mode Control: Application to Permanent Magnet Synchronous Motors","IEEE Transactions on Industrial Electronics, vol. 70, no. 5, pp. 5161-5170, 2023","",2023,"7.5",2],
  [9,"Sesun You (first Author), Jeonghwan Gil, and Wonhee Kim*","Adaptive Neural Network Control Using Nonlinear Information Gain for Permanent Magnet Synchronous Motors","IEEE Transactions on Cybernetics, vol. 53, no. 3, pp. 1394-1404, 2023","",2023,"9.4",4.2],
  [8,"Jeonghwan Gil, Sesun You, Youngwoo Lee, and Wonhee Kim*","Nonlinear Sliding Mode Controller Using Disturbance Observer for Permanent Magnet Synchronous Motors under Disturbance","Expert Systems With Applications, vol. 214, 119085, 2023","",2023,"7.5",6.9],
  [7,"Sesun You (first Author), Young Seop Son*, Yonghao Gui, and Wonhee Kim*","Gradient-descent Based Learning Gain for Backstepping Controller and Disturbance Observer of Nonlinear Systems","IEEE Access, vol. 11, pp. 2743-2753, 2023","",2023,"3.4",34.4],
  [6,"Sesun You (first Author), Jeonghwan Gil, and Wonhee Kim*","Fixed-Time Slip Control With Extended-State Observer Using Only Wheel Speed for Anti-Lock Braking Systems of Electric Vehicles","IEEE Transactions on Intelligent Transportation Systems, vol. 23, no. 7, pp. 6368-6378, 2022","",2022,"7.9",6.4],
  [5,"Jeonghwan Gil, Sesun You, Youngwoo Lee, and Wonhee Kim*","Back Electro Motive Force Estimation Method for Cascade Proportional Integral Control in Permanent Magnet Synchronous Motors","Actuators, vol. 10, no. 12, pp. 319(1-17), 2021","",2021,"2.2",41.3],
  [4,"Hojin Lee, Jeonghwan Gil, Sesun You, Yonghao Gui, and Wonhee Kim*","Arm Angle Tracking Control with Pole Balancing Using Equivalent Input Disturbance Rejection for Rotational Inverted Pendulum","Mathematics, vol. 9, pp. 2745(1-16), 2021","",2021,"2.3",4.2],
  [3,"Jeonghwan Gil, Sesun You, Youngwoo Lee, and Wonhee Kim*","Super Twisting-Based Nonlinear Gain Sliding Mode Controller for Position Control of Permanent-Magnet Synchronous Motors","IEEE Access, vol. 9, pp. 142060 – 142070, 2021","",2021,"3.4",34.4],
  [2,"Sesun You (first Author), Kwanyeon Kim, Jun Moon, and Wonhee Kim*","Extended State Observer Based Robust Position Tracking Control Using Nonlinear Damping Gain for Quadrotors with External Disturbance","IEEE Access, vol. 8, pp. 174558-174567, 2020","",2020,"3.4",34.4],
  [1,"Sesun You (first Author), Jeong Hwan Gil, and Wonhee Kim*","Extended State Observer Based Robust Position Tracking Control for DC Motor with External Disturbance and System Uncertainties","Journal of Electrical Engineering & Technology, vol. 14, no. 4, pp. 1637-1646, 2019","",2019,"1.6",67.8]
];

/* [title, registration no., inventors] */
const PATENTS = [
  ["전기 자동차의 ABS를 위한 도로 노면 상태 판단 기반의 최적 슬립 지령 생성 방법, 이를 수행하기 위한 기록 매체 및 장치","10-2280297","김원희, 유세선, 길정환"],
  ["상태 확장 관측기 기반 전기 자동차의 ABS 고정시간 슬립 제어 방법, 이를 수행하기 위한 기록 매체 및 장치","10-2297499","김원희, 유세선, 길정환"],
  ["철도용 영구자석 동기전동기의 전기적 파라미터를 추정하기 위한 외란 관측기 기반 방법, 이를 수행하기 위한 기록 매체 및 장치","10-2517777","김원희, 길정환, 유세선"],
  ["태양광 패널의 최대 전력을 추정하기 위한 장치 및 이를 포함하는 태양광 발전 제어 시스템과 방법","10-2581386","김원희, 임재윤, 유세선, 이영우"],
  ["마이크로그리드에서 실시간 경제급전을 위한 최적화 장치 및 방법","10-2582036","김원희, 임재윤, 유세선, 이영우"],
  ["나노그리드 에너지 관리 시스템 및 방법","10-2694248","김원희, 임재윤, 유세선, 이영우"],
  ["영구자석 동기 전동기의 위치 추종 제어를 위한 제어 방법 및 제어 시스템","10-2730067","문준, 구재형, 김원희, 유세선"]
];

/* newest first: [year, date, text, photos, optional vertical focus % for the cover crop] */
const NEWS = [
  [2026,"2026.08.24","Members of our lab held a dinner gathering at Seogam Saeng Sogeum-gui (158 Harmony-ro, Yeonsu-gu, Incheon) to celebrate the relocation of our lab.",["news-2026-08-24-1.jpg","news-2026-08-24-2.jpg"]],
  [2026,"2026.07.14","Joint dinner with the Power & Energy Systems LAB at Seodang-ro 61 in Daegu to celebrate the end of the first semester and hold a farewell party.",["news-2026-07-14-1.jpg","news-2026-07-14-2.jpg"]],
  [2026,"2026.07.01 – 04","Members of our lab participated in the 2026 ICROS Annual Conference at EXCO in Daegu, South Korea, and presented their research posters.",["news-2026-07-01-1.jpg","news-2026-07-01-2.jpg","news-2026-07-01-3.jpg","news-2026-07-01-4.jpg","news-2026-07-01-5.jpg","news-2026-07-01-6.jpg","news-2026-07-01-7.jpg"]],
  [2026,"2026.04.03","A cherry blossom outing to celebrate the spring of the 2026 academic year at Keimyung University, Daegu.",["news-2026-04-03-1.jpg","news-2026-04-03-2.jpg"]],
  [2025,"2025.12.23","Year-end dinner celebrating the successful completion of the 2025 academic year at “Juhong,” Daegu.",["news-2025-12-23-1.jpg","news-2025-12-23-2.jpg"],80],
  [2025,"2025.11.27 – 29","Members of our lab participated in the 2025 KIIS conference held at Seokyeong University, Seoul.",["news-2025-11-27-1.jpg","news-2025-11-27-2.jpg","news-2025-11-27-3.jpg"]],
  [2025,"2025.08.21","Participation in the 2025 Academic Activities of the KIEE and KIIEE Daegu-Gyeongbuk Chapter at Keimyung University, Dalseo-gu, Daegu.",["news-2025-08-21-1.jpg","news-2025-08-21-2.jpg","news-2025-08-21-3.jpg"]]
];

/* paper first pages shown on the home page: [publication no., image] */
const COVERS = [
  [19,"cover-1.jpg"],
  [18,"cover-2.jpg"],
  [17,"cover-3.jpg"],
  [12,"cover-4.jpg"],
  [13,"cover-5.jpg"]
];
