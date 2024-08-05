import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
export const detectedImagesGlobal = {};
 
const test = () => {
  const navigate = useNavigate();
  const [detectedImages, setDetectedImages] = useState({});
 
  const markers = [
 
    //APATH/AA
    { id: 'AAone', name: 'AA', url: 'collections/APATH/AA/AA1', place : 'AA1',},
    { id: 'AAtwo', name: 'AA', url: 'collections/APATH/AA/AA2', place : 'AA2'},
    { id: 'AAthree', name: 'AA', url: 'collections/APATH/AA/AA3', place : 'AA3'},
 
    //APATH/AB
    { id: 'ABone', name: 'AB', url: 'collections/APATH/AB/AB1', place : 'AB1'},
    { id: 'ABtwo', name: 'AB', url: 'collections/APATH/AB/AB2', place : 'AB2'},
    { id: 'ABthree', name: 'AB', url: 'collections/APATH/AB/AB3', place : 'AB3'},
 
    //APATH/AC
    { id: 'ACone', name: 'AC', url: 'collections/APATH/AC/AC1', place : 'AC1'},
    { id: 'ACtwo', name: 'AC', url: 'collections/APATH/AC/AC2', place : 'AC2'},
    { id: 'ACthree', name: 'AC', url: 'collections/APATH/AC/AC3', place : 'AC3'},
    { id: 'ACfour', name: 'AC', url: 'collections/APATH/AC/AC4', place : 'AC4'},
 
    //APATH/AD
    { id: 'ADone', name: 'AD', url: 'collections/APATH/AD/AD1', place : 'AD1'},
    { id: 'ADtwo', name: 'AD', url: 'collections/APATH/AD/AD2', place : 'AD2'},
    { id: 'ADthree', name: 'AD', url: 'collections/APATH/AD/AD3', place : 'AD3'},
    { id: 'ADfour', name: 'AD', url: 'collections/APATH/AD/AD4', place : 'AD4'},
 
    //APATH/AE
    { id: 'AEone', name: 'AE', url: 'collections/APATH/AE/AE1', place : 'AE1'},
    { id: 'AEtwo', name: 'AE', url: 'collections/APATH/AE/AE2', place : 'AE2'},
    { id: 'AEthree', name: 'AE', url: 'collections/APATH/AE/AE3', place : 'AE3'},
    { id: 'AEfour', name: 'AE', url: 'collections/APATH/AE/AE4', place : 'AE4'},
 
    //APATH/AG
    { id: 'AGone', name: 'AG', url: 'collections/APATH/AG/AG1', place : 'AG1'},
    { id: 'AGtwo', name: 'AG', url: 'collections/APATH/AG/AG1', place : 'AG2'},
    { id: 'AGthree', name: 'AG', url: 'collections/APATH/AG/AG3', place : 'AG3'},
    { id: 'AGfour', name: 'AG', url: 'collections/APATH/AG/AG4', place : 'AG4'},
 
    //APATH/AF
    { id: 'AFone', name: 'AF', url: 'collections/APATH/AF/AF1', place : 'AF1'},
    { id: 'AFtwo', name: 'AF', url: 'collections/APATH/AF/AF2', place : 'AF2'},
    { id: 'AFthree', name: 'AF', url: 'collections/APATH/AF/AF3', place : 'AF3'},
    { id: 'AFfour', name: 'AF', url: 'collections/APATH/AF/AF4', place : 'AF4'},
 
    //APATH/AH
    { id: 'AHone', name: 'AH', url: 'collections/APATH/AH/AH1', place : 'AH1'},
    { id: 'AHtwo', name: 'AH', url: 'collections/APATH/AH/AH2', place : 'AH2'},
    { id: 'AHthree', name: 'AH', url: 'collections/APATH/AH/AH3', place : 'AH3'},
    { id: 'AHfour', name: 'AH', url: 'collections/APATH/AH/AH4', place : 'AH4'},
 
    //APATH/AI
    { id: 'AIone', name: 'AI', url: 'collections/APATH/AI/AI1', place : 'AI1'},
    { id: 'AItwo', name: 'AI', url: 'collections/APATH/AI/AI2', place : 'AI2'},
    { id: 'AIthree', name: 'AI', url: 'collections/APATH/AI/AI3', place : 'AI3'},
    { id: 'AIfour', name: 'AI', url: 'collections/APATH/AI/AI4', place : 'AI4'},
 
    //BPATH/B
    { id: 'Bone', name: 'B', url: 'collections/BPATH/B/B1', place : 'B1'},  
    { id: 'Btwo', name: 'B', url: 'collections/BPATH/B/B2', place : 'B2'},
    { id: 'Bthree', name: 'B', url: 'collections/BPATH/B/B3', place : 'B3'},
    { id: 'Bfour', name: 'B', url: 'collections/BPATH/B/B4', place : 'B4'},
    { id: 'Bfive', name: 'B', url: 'collections/BPATH/B/B5', place : 'B5'},
    { id: 'Bsix', name: 'B', url: 'collections/BPATH/B/B6', place : 'B6'},
    { id: 'Bseven', name: 'B', url: 'collections/BPATH/B/B7', place : 'B7'},
    { id: 'Beight', name: 'B', url: 'collections/BPATH/B/B8', place : 'B8'},
    { id: 'Bnine', name: 'B', url: 'collections/BPATH/B/B9', place : 'B9'},
    { id: 'Bten', name: 'B', url: 'collections/BPATH/B/B10', place : 'B10'},
 
    //BPATH/BA
    { id: 'BAone', name: 'BA', url: 'collections/BPATH/BA/BA1', place : 'BA1'},  
    { id: 'BAtwo', name: 'BA',url: 'collections/BPATH/BA/BA2', place : 'BA2'},
    { id: 'BAthree', name: 'BA',url: 'collections/BPATH/BA/BA3', place : 'BA3'},
    { id: 'BAfour', name: 'BA',url: 'collections/BPATH/BA/BA4', place : 'BA4'},
    { id: 'BAfive', name: 'BA',url: 'collections/BPATH/BA/BA5', place : 'BA5'},
    { id: 'BAsix', name: 'BA',url: 'collections/BPATH/BA/BA6', place : 'BA6'},
    { id: 'BAseven', name: 'BA',url: 'collections/BPATH/BA/BA7', place : 'BA7'},
 
    //BPATH/BB
    { id: 'BBone', name: 'BB', url: 'collections/BPATH/BB/BB1', place : 'BB1'},  
    { id: 'BBtwo', name: 'BB', url: 'collections/BPATH/BB/BB2', place : 'BB2'},
    { id: 'BBthree', name: 'BB', url: 'collections/BPATH/BB/BB3', place : 'BB3'},
    { id: 'BBfour', name: 'BB', url: 'collections/BPATH/BB/BB4', place : 'BB4'},
    { id: 'BBfive', name: 'BB', url: 'collections/BPATH/BB/BB5', place : 'BB5'},
 
 
 
    //BPATH/BC
    { id: 'BCone', name: 'BC', url: 'collections/BPATH/BC/BC1', place : 'BC1'},  
    { id: 'BCtwo', name: 'BC',url: 'collections/BPATH/BC/BC2', place : 'BC2'},
    { id: 'BCthree', name: 'BC',url: 'collections/BPATH/BC/BC3', place : 'BC3'},
    { id: 'BCfour', name: 'BC',url: 'collections/BPATH/BC/BC4', place : 'BC4'},
    { id: 'BCfive', name: 'BC',url: 'collections/BPATH/BC/BC5', place : 'BC5'},
   
    //BPATH/BD
    { id: 'BDone', name: 'BD', url: 'collections/BPATH/BD/BD1', place : 'BD1'},  
    { id: 'BDtwo', name: 'BD',url: 'collections/BPATH/BD/BD2', place : 'BD2'},
    { id: 'BDthree', name: 'BD',url: 'collections/BPATH/BD/BD3', place : 'BD3'},
    { id: 'BDfour', name: 'BD',url: 'collections/BPATH/BD/BD4', place : 'BD4'},
    { id: 'BDfive', name: 'BD',url: 'collections/BPATH/BD/BD5', place : 'BD5'},
    { id: 'BDsix', name: 'BD',url: 'collections/BPATH/BD/BD6', place : 'BD6'},
 
   
    //BPATH/BE
    { id: 'BEone', name: 'BE', url: 'collections/BPATH/BE/BE1', place : 'BE1'},  
    { id: 'BEtwo', name: 'BE',url: 'collections/BPATH/BE/BE2', place : 'BE2'},
    { id: 'BEthree', name: 'BE',url: 'collections/BPATH/BE/BE3', place : 'BE3'},
    { id: 'BEfour', name: 'BE',url: 'collections/BPATH/BE/BE4', place : 'BE4'},
    { id: 'BEfive', name: 'BE',url: 'collections/BPATH/BE/BE5', place : 'BE5'},
 
    //BPATH/BF
    { id: 'BFone', name: 'BF', url: 'collections/BPATH/BF/BF1', place : 'BF1'},  
    { id: 'BFtwo', name: 'BF',url: 'collections/BPATH/BF/BF2', place : 'BF2'},
    { id: 'BFthree', name: 'BF',url: 'collections/BPATH/BF/BF3', place : 'BF3'},
    { id: 'BFfour', name: 'BF',url: 'collections/BPATH/BF/BF4', place : 'BF4'},
 
    //BPATH/BG
    { id: 'BGone', name: 'BG', url: 'collections/BPATH/BG/BG1', place : 'BG1'},  
    { id: 'BGtwo', name: 'BG',url: 'collections/BPATH/BG/BG2', place : 'BG2'},
    { id: 'BGthree', name: 'BG',url: 'collections/BPATH/BG/BG3', place : 'BG3'},
    { id: 'BGfour', name: 'BG',url: 'collections/BPATH/BG/BG4', place : 'BG4'},
    { id: 'BGfive', name: 'BG',url: 'collections/BPATH/BG/BG5', place : 'BG5'},
 
    //BPATH/BH
    { id: 'BHone', name: 'BH', url: 'collections/BPATH/BH/BH1', place : 'BH1'},  
    { id: 'BHtwo', name: 'BH',url: 'collections/BPATH/BH/BH2', place : 'BH2'},
    { id: 'BHthree', name: 'BH',url: 'collections/BPATH/BH/BH3', place : 'BH3'},
    { id: 'BHfour', name: 'BH',url: 'collections/BPATH/BH/BH4', place : 'BH4'},
    { id: 'BHfive', name: 'BH',url: 'collections/BPATH/BH/BH5', place : 'BH5'},
 
 
    //BPATH/BI
    { id: 'BIone', name: 'BI', url: 'collections/BPATH/BI/BI1', place : 'BI1'},  
    { id: 'BItwo', name: 'BI',url: 'collections/BPATH/BI/BI2', place : 'BI2'},
    { id: 'BIthree', name: 'BI',url: 'collections/BPATH/BI/BI3', place : 'BI3'},
    { id: 'BIfour', name: 'BI',url: 'collections/BPATH/BI/BI4', place : 'BI4'},
    { id: 'BIfive', name: 'BI',url: 'collections/BPATH/BI/BI5', place : 'BI5'},
   
 
    //BPATH/BJ
    { id: 'BJone', name: 'BJ', url: 'collections/BPATH/BJ/BJ1', place : 'BJ1'},  
    { id: 'BJtwo', name: 'BJ',url: 'collections/BPATH/BJ/BJ2', place : 'BJ2'},
    { id: 'BJthree', name: 'BJ',url: 'collections/BPATH/BJ/BJ3', place : 'BJ3'},
    { id: 'BJfour', name: 'BJ',url: 'collections/BPATH/BJ/BJ4', place : 'BJ4'},
    { id: 'BJfive', name: 'BJ',url: 'collections/BPATH/BJ/BJ5', place : 'BJ5'},
 
 
    //BPATH/BK
    { id: 'BKone', name: 'BK', url: 'collections/BPATH/BK/BK1', place : 'BK1'},  
    { id: 'BKtwo', name: 'BK',url: 'collections/BPATH/BK/BK2', place : 'BK2'},
    { id: 'BKthree', name: 'BK',url: 'collections/BPATH/BK/BK3', place : 'BK3'},
    { id: 'BKfour', name: 'BK',url: 'collections/BPATH/BK/BK4', place : 'BK4'},
    { id: 'BKfive', name: 'BK',url: 'collections/BPATH/BK/BK5', place : 'BK5'},
 
    //CPATH/CA
    { id: 'CAone', name: 'CA', url: 'collections/CPATH/CA/CA1', place : 'CA1'},
    { id: 'CAtwo', name: 'CA', url: 'collections/CPATH/CA/CA2', place : 'CA2'},
    { id: 'CAthree', name: 'CA', url: 'collections/CPATH/CA/CA3', place : 'CA3'},
    { id: 'CAfour', name: 'CA', url: 'collections/CPATH/CA/CA4', place : 'CA4'},
    { id: 'CAfive', name: 'CA', url: 'collections/CPATH/CA/CA5', place : 'CA5'},
    { id: 'CAsiX', name: 'CA', url: 'collections/CPATH/CA/CA6', place : 'CA6'},
    { id: 'CAseven', name: 'CA', url: 'collections/CPATH/CA/CA7', place : 'CA7'},
    { id: 'CAeight', name: 'CA', url: 'collections/CPATH/CA/CA8', place : 'CA8'},
 
    //CPATH/CB
    { id: 'CBone', name: 'CB', url: 'collections/CPATH/CB/CB1', place : 'CB1'},
    { id: 'CBtwo', name: 'CB', url: 'collections/CPATH/CB/CB2', place : 'CB2'},
    { id: 'CBthree', name: 'CB', url: 'collections/CPATH/CB/CB3', place : 'CB3'},
    { id: 'CBfour', name: 'CB', url: 'collections/CPATH/CB/CB4', place : 'CB4'},
    { id: 'CBfive', name: 'CB', url: 'collections/CPATH/CB/CB5', place : 'CB5'},
    { id: 'CBsix', name: 'CB', url: 'collections/CPATH/CB/CB6', place : 'CB6'},
 
    //CPATH/CC
    { id: 'CCone', name: 'CC', url: 'collections/CPATH/CC/CC1', place : 'CC1'},
    { id: 'CCtwo', name: 'CC', url: 'collections/CPATH/CC/CC2', place : 'CC2'},
    { id: 'CCthree', name: 'CC', url: 'collections/CPATH/CC/CC3', place : 'CC3'},
    { id: 'CCfour', name: 'CC', url: 'collections/CPATH/CC/CC4', place : 'CC4'},
    { id: 'CCfive', name: 'CC', url: 'collections/CPATH/CC/CC5', place : 'CC5'},
    { id: 'CCsix', name: 'CC', url: 'collections/CPATH/CC/CC6', place : 'CC6'},
 
    //CPATH/CD
    { id: 'CDone', name: 'CD', url: 'collections/CPATH/CD/CD1', place : 'CD1'},
    { id: 'CDtwo', name: 'CD', url: 'collections/CPATH/CD/CD2', place : 'CD2'},
    { id: 'CDthree', name: 'CD', url: 'collections/CPATH/CD/CD3', place : 'CD3'},
    { id: 'CDfour', name: 'CD', url: 'collections/CPATH/CD/CD4', place : 'CD4'},
    { id: 'CDfive', name: 'CD', url: 'collections/CPATH/CD/CD5', place : 'CD5'},
    { id: 'CDsix', name: 'CD', url: 'collections/CPATH/CD/CD6', place : 'CD6'},
    { id: 'CDseven', name: 'CD', url: 'collections/CPATH/CD/CD7', place : 'CD7'},
 
    //CPATH/CE
    { id: 'CEone', name: 'CE', url: 'collections/CPATH/CE/CE1', place : 'CE1'},
    { id: 'CEtwo', name: 'CE', url: 'collections/CPATH/CE/CE2', place : 'CE2'},
    { id: 'CEthee', name: 'CE', url: 'collections/CPATH/CE/CE3', place : 'CE3'},
    { id: 'CEfour', name: 'CE', url: 'collections/CPATH/CE/CE4', place : 'CE4'},
    { id: 'CEfive', name: 'CE', url: 'collections/CPATH/CE/CE5', place : 'CE5'},
    { id: 'CEsix', name: 'CE', url: 'collections/CPATH/CE/CE6', place : 'CE6'},
 
    //CPATH/CF
    { id: 'CFone', name: 'CF', url: 'collections/CPATH/CF/CF1', place : 'CF1'},
    { id: 'CFtwo', name: 'CF', url: 'collections/CPATH/CF/CF2', place : 'CF2'},
    { id: 'CFthree', name: 'CF', url: 'collections/CPATH/CF/CF3', place : 'CF3'},
    { id: 'CFfour', name: 'CF', url: 'collections/CPATH/CF/CF4', place : 'CF4'},
    { id: 'CFfive', name: 'CF', url: 'collections/CPATH/CF/CF5', place : 'CF5'},
    { id: 'CFsix', name: 'CF', url: 'collections/CPATH/CF/CF6', place : 'CF6'},
    { id: 'CFseven', name: 'CF', url: 'collections/CPATH/CF/CF7', place : 'CF7'},
 
    //CPATH/CG
    { id: 'CGone', name: 'CG', url: 'collections/CPATH/CG/CG1', place : 'CG1'},
    { id: 'CGtwo', name: 'CG', url: 'collections/CPATH/CG/CG2', place : 'CG2'},
    { id: 'CGthree', name: 'CG', url: 'collections/CPATH/CG/CG3', place : 'CG3'},
    { id: 'CGfour', name: 'CG', url: 'collections/CPATH/CG/CG4', place : 'CG4'},
    { id: 'CGfive', name: 'CG', url: 'collections/CPATH/CG/CG5', place : 'CG5'},
    { id: 'CGsix', name: 'CG', url: 'collections/CPATH/CG/CG6', place : 'CG6'},
 
    //DPATH/D
    { id: 'Done', name: 'D', url: 'collections/DPATH/D/D1', place : 'D1'},
    { id: 'Dtwo', name: 'D', url: 'collections/DPATH/D/D2', place : 'D2'},
    { id: 'Dthree', name: 'D', url: 'collections/DPATH/D/D3', place : 'D3'},
    { id: 'Dfour', name: 'D', url: 'collections/DPATH/D/D4', place : 'D4'},
    { id: 'Dfive', name: 'D', url: 'collections/DPATH/D/D5', place : 'D5'},
    { id: 'Dsix', name: 'D', url: 'collections/DPATH/D/D6', place : 'D6'},
    { id: 'Dseven', name: 'D', url: 'collections/DPATH/D/D7', place : 'D7'},
    { id: 'Deight', name: 'D', url: 'collections/DPATH/D/D8', place : 'D8'},
 
    //DPATH/DA
    { id: 'DAone', name: 'DA', url: 'collections/DPATH/DA/DA1', place : 'DA1'},
    { id: 'DAtwo', name: 'DA', url: 'collections/DPATH/DA/DA2', place : 'DA2'},
    { id: 'DAthree', name: 'DA', url: 'collections/DPATH/DA/DA3', place : 'DA3'},
    { id: 'DAfour', name: 'DA', url: 'collections/DPATH/DA/DA4', place : 'DA4'},
    { id: 'DAfive', name: 'DA', url: 'collections/DPATH/DA/DA5', place : 'DA5'},
    { id: 'DAsix', name: 'DA', url: 'collections/DPATH/DA/DA6', place : 'DA6'},
    { id: 'DAseven', name: 'DA', url: 'collections/DPATH/DA/DA7', place : 'DA7'},
   
    //DPATH/DB
    { id: 'DBone', name: 'DB', url: 'collections/DPATH/DB/DB1', place : 'DB1'},
    { id: 'DBtwo', name: 'DB', url: 'collections/DPATH/DB/DB2', place : 'DB2'},
    { id: 'DBthree', name: 'DB', url: 'collections/DPATH/DB/DB3', place : 'DB3'},
    { id: 'DBfour', name: 'DB', url: 'collections/DPATH/DB/DB4', place : 'DB4'},
    { id: 'DBfive', name: 'DB', url: 'collections/DPATH/DB/DB5', place : 'DB5'},
    { id: 'DBsix', name: 'DB', url: 'collections/DPATH/DB/DB6', place : 'DB6'},
    { id: 'DBseven', name: 'DB', url: 'collections/DPATH/DB/DB7', place : 'DB7'},
    { id: 'DBeight', name: 'DB', url: 'collections/DPATH/DB/DB8', place : 'DB8'},
 
    //DPATH/DC
    { id: 'DCone', name: 'DC', url: 'collections/DPATH/DC/DC1', place : 'DC1'},
    { id: 'DCtwo', name: 'DC', url: 'collections/DPATH/DC/DC2', place : 'DC2'},
    { id: 'DCthree', name: 'DC', url: 'collections/DPATH/DC/DC3', place : 'DC3'},
    { id: 'DCfour', name: 'DC', url: 'collections/DPATH/DC/DC4', place : 'DC4'},
 
    //HPATH/HA
    { id: 'HAone', name: 'HA', url: 'collections/HPATH/HA/HA1', place : 'HA1'},
    { id: 'HAtwo', name: 'HA', url: 'collections/HPATH/HA/HA2', place : 'HA2'},
    { id: 'HAthree', name: 'HA', url: 'collections/HPATH/HA/HA3', place : 'HA3'},
    { id: 'HAfour', name: 'HA', url: 'collections/HPATH/HA/HA4', place : 'HA4'},
    { id: 'HAfive', name: 'HA', url: 'collections/HPATH/HA/HA5', place : 'HA5'},
    { id: 'HAsix', name: 'HA', url: 'collections/HPATH/HA/HA6', place : 'HA6'},
    { id: 'HAseven', name: 'HA', url: 'collections/HPATH/HA/HA7', place : 'HA7'},
    { id: 'HAeight', name: 'HA', url: 'collections/HPATH/HA/HA8', place : 'HA8'},
    { id: 'HAnine', name: 'HA', url: 'collections/HPATH/HA/HA9', place : 'HA9'},
 
    //HPATH/HB
    { id: 'HBone', name: 'HB', url: 'collections/HPATH/HB/HB1', place : 'HB1'},
    { id: 'HBtwo', name: 'HB', url: 'collections/HPATH/HB/HB2', place : 'HB2'},
    { id: 'HBthree', name: 'HB', url: 'collections/HPATH/HB/HB3', place : 'HB3'},
    { id: 'HBfour', name: 'HB', url: 'collections/HPATH/HB/HB4', place : 'HB4'},
    { id: 'HBfive', name: 'HB', url: 'collections/HPATH/HB/HB5', place : 'HB5'},
    { id: 'HBsix', name: 'HB', url: 'collections/HPATH/HB/HB6', place : 'HB6'},
    { id: 'HBseven', name: 'HB', url: 'collections/HPATH/HB/HB7', place : 'HB7'},
    { id: 'HBeight', name: 'HB', url: 'collections/HPATH/HB/HB8', place : 'HB8'},
    { id: 'HBnine', name: 'HB', url: 'collections/HPATH/HB/HB9', place : 'HB9'},
    { id: 'HBten', name: 'HB', url: 'collections/HPATH/HB/HB10', place : 'HB10'},
 
    //HPATH/HC
    { id: 'HCone', name: 'HC', url: 'collections/HPATH/HC/HC1', place : 'HC1'},
    { id: 'HCtwo', name: 'HC', url: 'collections/HPATH/HC/HC2', place : 'HC2'},
    { id: 'HCthree', name: 'HC', url: 'collections/HPATH/HC/HC3', place : 'HC3'},
    { id: 'HCfour', name: 'HC', url: 'collections/HPATH/HC/HC4', place : 'HC4'},
    { id: 'HCfive', name: 'HC', url: 'collections/HPATH/HC/HC5', place : 'HC5'},
    { id: 'HCsix', name: 'HC', url: 'collections/HPATH/HC/HC6', place : 'HC6'},
    { id: 'HCseven', name: 'HC', url: 'collections/HPATH/HC/HC7', place : 'HC7'},
    { id: 'HCeight', name: 'HC', url: 'collections/HPATH/HC/HC8', place : 'HC8'},
    { id: 'HCnine', name: 'HC', url: 'collections/HPATH/HC/HC9', place : 'HC9'},
    { id: 'HCten', name: 'HC', url: 'collections/HPATH/HC/HC10', place : 'HC10'},
 
    //HPATH/HD
    { id: 'HDone', name: 'HD', url: 'collections/HPATH/HD/HD1', place : 'HD1'},
    { id: 'HDtwo', name: 'HD', url: 'collections/HPATH/HD/HD2', place : 'HD2'},
    { id: 'HDthree', name: 'HD', url: 'collections/HPATH/HD/HD3', place : 'HD3'},
    { id: 'HDfour', name: 'HD', url: 'collections/HPATH/HD/HD4', place : 'HD4'},
    { id: 'HDfive', name: 'HD', url: 'collections/HPATH/HD/HD5', place : 'HD5'},
    { id: 'HDsix', name: 'HD', url: 'collections/HPATH/HD/HD6', place : 'HD6'},
    { id: 'HDseven', name: 'HD', url: 'collections/HPATH/HD/HD7', place : 'HD7'},
    { id: 'HDeight', name: 'HD', url: 'collections/HPATH/HD/HD8', place : 'HD8'},
    { id: 'HDnine', name: 'HD', url: 'collections/HPATH/HD/HD9', place : 'HD9'},
 
    //HPATH/HE
    { id: 'HEone', name: 'HE', url: 'collections/HPATH/HE/HE1', place : 'HE1'},
    { id: 'HEtwo', name: 'HE', url: 'collections/HPATH/HE/HE2', place : 'HE2'},
    { id: 'HEthree', name: 'HE', url: 'collections/HPATH/HE/HE3', place : 'HE3'},
    { id: 'HEfour', name: 'HE', url: 'collections/HPATH/HE/HE4', place : 'HE4'},
    { id: 'HEfive', name: 'HE', url: 'collections/HPATH/HE/HE5', place : 'HE5'},
    { id: 'HEsix', name: 'HE', url: 'collections/HPATH/HE/HE6', place : 'HE6'},
    { id: 'HEseven', name: 'HE', url: 'collections/HPATH/HE/HE7', place : 'HE7'},
    { id: 'HEeight', name: 'HE', url: 'collections/HPATH/HE/HE8', place : 'HE8'},
 
    //HPATH/HF
    { id: 'HFone', name: 'HF', url: 'collections/HPATH/HF/HF1', place : 'HF1'},
    { id: 'HFtwo', name: 'HF', url: 'collections/HPATH/HF/HF2', place : 'HF2'},
    { id: 'HFthree', name: 'HF', url: 'collections/HPATH/HF/HF3', place : 'HF3'},
    { id: 'HFfour', name: 'HF', url: 'collections/HPATH/HF/HF4', place : 'HF4'},
    { id: 'HFfive', name: 'HF', url: 'collections/HPATH/HF/HF5', place : 'HF5'},
    { id: 'HFsix', name: 'HF', url: 'collections/HPATH/HF/HF6', place : 'HF6'},
    { id: 'HFseven', name: 'HF', url: 'collections/HPATH/HF/HF7', place : 'HF7'},
    { id: 'HFeight', name: 'HF', url: 'collections/HPATH/HF/HF8', place : 'HF8'},
 
    //HPATH/HG
    { id: 'HGone', name: 'HG', url: 'collections/HPATH/HG/HG1', place : 'HG1'},
    { id: 'HGtwo', name: 'HG', url: 'collections/HPATH/HG/HG2', place : 'HG2'},
    { id: 'HGthree', name: 'HG', url: 'collections/HPATH/HG/HG3', place : 'HG3'},
    { id: 'HGfour', name: 'HG', url: 'collections/HPATH/HG/HG4', place : 'HG4'},
    { id: 'HGfive', name: 'HG', url: 'collections/HPATH/HG/HG5', place : 'HG5'},
    { id: 'HGsix', name: 'HG', url: 'collections/HPATH/HG/HG6', place : 'HG6'},
    { id: 'HGseven', name: 'HG', url: 'collections/HPATH/HG/HG7', place : 'HG7'},
 
    //HPATH/HH
    { id: 'HHone', name: 'HH', url: 'collections/HPATH/HH/HH1', place : 'HH1'},
    { id: 'HHtwo', name: 'HH', url: 'collections/HPATH/HH/HH2', place : 'HH2'},
    { id: 'HHthree', name: 'HH', url: 'collections/HPATH/HH/HH3', place : 'HH3'},
    { id: 'HHfour', name: 'HH', url: 'collections/HPATH/HH/HH4', place : 'HH4'},
    { id: 'HHfive', name: 'HH', url: 'collections/HPATH/HH/HH5', place : 'HH5'},
    { id: 'HHsix', name: 'HH', url: 'collections/HPATH/HH/HH6', place : 'HH6'},
    { id: 'HHseven', name: 'HH', url: 'collections/HPATH/HH/HH7', place : 'HH7'},
    { id: 'HHeight', name: 'HH', url: 'collections/HPATH/HH/HH8', place : 'HH8'},
    { id: 'HHnine', name: 'HH', url: 'collections/HPATH/HH/HH9', place : 'HH9'},
 
     //JPATH/J0
    { id: 'J0Aone', name: 'J0', url: 'collections/JPATH/J0/J01', place : 'J01'},  
    { id: 'J0two', name: 'J0',url: 'collections/JPATH/J0/J02', place : 'J02'},
    { id: 'J0three', name: 'J0',url: 'collections/JPATH/J0/J03', place : 'J03'},
    { id: 'J0four', name: 'J0',url: 'collections/JPATH/J0/J04', place : 'J04'},
    { id: 'J0five', name: 'J0',url: 'collections/JPATH/J0/J05', place : 'J05'},
    { id: 'J0six', name: 'J0',url: 'collections/JPATH/J0/J06', place : 'J06'},
    { id: 'J0seven', name: 'J0',url: 'collections/JPATH/J0/J07', place : 'J07'},
    { id: 'J0EIGHT', name: 'J0',url: 'collections/JPATH/J0/J08', place : 'J08'},
 
    //JPATH/JA
    { id: 'JAone', name: 'JA', url: 'collections/JPATH/JA/JA1', place : 'JA1'},  
    { id: 'JAtwo', name: 'JA',url: 'collections/JPATH/JA/JA2', place : 'JA2'},
    { id: 'JAthree', name: 'JA',url: 'collections/JPATH/JA/JA3', place : 'JA3'},
    { id: 'JAfour', name: 'JA',url: 'collections/JPATH/JA/JA4', place : 'JA4'},
    { id: 'JAfive', name: 'JA',url: 'collections/JPATH/JA/JA5', place : 'JA5'},
    { id: 'JAsix', name: 'JA',url: 'collections/JPATH/JA/JA6', place : 'JA6'},
 
    //JPATH/JB
    { id: 'JBone', name: 'JB', url: 'collections/JPATH/JB/JB1', place : 'JB1'},  
    { id: 'JBtwo', name: 'JB',url: 'collections/JPATH/JB/JB2', place : 'JB2'},
    { id: 'JBthree', name: 'JB',url: 'collections/JPATH/JB/JB3', place : 'JB3'},
    { id: 'JBfour', name: 'JB',url: 'collections/JPATH/JB/JB4', place : 'JB4'},
    { id: 'JBfive', name: 'JB',url: 'collections/JPATH/JB/JB5', place : 'JB5'},
    { id: 'JBsix', name: 'JB',url: 'collections/JPATH/JB/JB6', place : 'JB6'},
    { id: 'JBseven', name: 'JB',url: 'collections/JPATH/JB/JB7', place : 'JB7'},
 
    //JPATH/JC
    { id: 'JCAone', name: 'JC', url: 'collections/JPATH/JC/JC1', place : 'JC1'},  
    { id: 'JCtwo', name: 'JC',url: 'collections/JPATH/JC/JC2', place : 'JC2'},
    { id: 'JCthree', name: 'JC',url: 'collections/JPATH/JC/JC3', place : 'JC3'},
    { id: 'JCfour', name: 'JC',url: 'collections/JPATH/JC/JC4', place : 'JC4'},
    { id: 'JCfive', name: 'JC',url: 'collections/JPATH/JC/JC5', place : 'JC5'},
 
    //LPATH/L
    { id: 'Lone', name: 'L', url: 'collections/LPATH/L/L1', place : 'L1'},
    { id: 'Ltwo', name: 'L', url: 'collections/LPATH/L/L2', place : 'L2'},
    { id: 'Lthree', name: 'L', url: 'collections/LPATH/L/L3', place : 'L3'},
    { id: 'Lfour', name: 'L', url: 'collections/LPATH/L/L4', place : 'L4'},
    { id: 'Lfive', name: 'L', url: 'collections/LPATH/L/L5', place : 'L5'},
    { id: 'Lsix', name: 'L', url: 'collections/LPATH/L/L6', place : 'L6'},
    { id: 'Lseven', name: 'L', url: 'collections/LPATH/L/L7', place : 'L7'},
    { id: 'Leight', name: 'L', url: 'collections/LPATH/L/L8', place : 'L8'},
 
    //LPATH/LA
    { id: 'LAone', name: 'LA', url: 'collections/LPATH/LA/LA1', place : 'LA1'},
    { id: 'LAtwo', name: 'LA', url: 'collections/LPATH/LA/LA2', place : 'LA2'},
    { id: 'LAthree', name: 'LA', url: 'collections/LPATH/LA/LA3', place : 'LA3'},
    { id: 'LAfour', name: 'LA', url: 'collections/LPATH/LA/LA4', place : 'LA4'},
    { id: 'LAfive', name: 'LA', url: 'collections/LPATH/LA/LA5', place : 'LA5'},
    { id: 'LAsix', name: 'LA', url: 'collections/LPATH/LA/LA6', place : 'LA6'},
    { id: 'LAseven', name: 'LA', url: 'collections/LPATH/LA/LA7', place : 'LA7'},
    { id: 'LAeight', name: 'LA', url: 'collections/LPATH/LA/LA8', place : 'LA8'},
 
    //LPATH/LB
    { id: 'LBone', name: 'LB', url: 'collections/LPATH/LB/LB1', place : 'LB1'},
    { id: 'LBtwo', name: 'LB', url: 'collections/LPATH/LB/LB2', place : 'LB2'},
    { id: 'LBthree', name: 'LB', url: 'collections/LPATH/LB/LB3', place : 'LB3'},
    { id: 'LBfour', name: 'LB', url: 'collections/LPATH/LB/LB4', place : 'LB4'},
    { id: 'LBfive', name: 'LB', url: 'collections/LPATH/LB/LB5', place : 'LB5'},
    { id: 'LBsix', name: 'LB', url: 'collections/LPATH/LB/LB6', place : 'LB6'},
    { id: 'LBseven', name: 'LB', url: 'collections/LPATH/LB/LB7', place : 'LB7'},
 
    //LPATH/LC
    { id: 'LCone', name: 'LC', url: 'collections/LPATH/LC/LC1', place : 'LC1'},
    { id: 'LCtwo', name: 'LC', url: 'collections/LPATH/LC/LC2', place : 'LC2'},
    { id: 'LCthree', name: 'LC', url: 'collections/LPATH/LC/LC3', place : 'LC3'},
    { id: 'LCfour', name: 'LC', url: 'collections/LPATH/LC/LC4', place : 'LC4'},
    { id: 'LCfive', name: 'LC', url: 'collections/LPATH/LC/LC5', place : 'LC5'},
    { id: 'LCsix', name: 'LC', url: 'collections/LPATH/LC/LC6', place : 'LC6'},
    { id: 'LCseven', name: 'LC', url: 'collections/LPATH/LC/LC7', place : 'LC7'},
    { id: 'LCeight', name: 'LC', url: 'collections/LPATH/LC/LC8', place : 'LC8'},
    { id: 'LCnine', name: 'LC', url: 'collections/LPATH/LC/LC9', place : 'LC9'},
 
    //WPATH/W
    { id: 'Wone', name: 'W', url: 'collections/WPATH/W/W1', place : 'W1'},
    { id: 'Wtwo', name: 'W', url: 'collections/WPATH/W/W2', place : 'W2'},
    { id: 'Wthree', name: 'W', url: 'collections/WPATH/W/W3', place : 'W3'},
    { id: 'Wfour', name: 'W', url: 'collections/WPATH/W/W4', place : 'W4'},
 
    //WPATH/WA
    { id: 'WAone', name:'WA', url: 'collections/WPATH/WA/WA1', place : 'WA1'},
    { id: 'WAtwo', name:'WA', url: 'collections/WPATH/WA/WA2', place : 'WA2'},
    { id: 'WAthree', name:'WA', url: 'collections/WPATH/WA/WA3', place : 'WA3'},
    { id: 'WAfour', name:'WA', url: 'collections/WPATH/WA/WA4', place : 'WA4'},
    { id: 'WAfive', name:'WA', url: 'collections/WPATH/WA/WA5', place : 'WA5'},
    { id: 'WAsix', name:'WA', url: 'collections/WPATH/WA/WA6', place : 'WA6'},
    { id: 'WAseven', name:'WA', url: 'collections/WPATH/WA/WA7', place : 'WA7'},
    { id: 'WAeight', name:'WA', url: 'collections/WPATH/WA/WA8', place : 'WA8'},
 
    //WPATH/WB
    { id: 'WBone', name:'WB', url: 'collections/WPATH/WB/WB1', place : 'WB1'},
    { id: 'WBtwo', name:'WB', url: 'collections/WPATH/WB/WB2', place : 'WB2'},
    { id: 'WBthree', name:'WB', url: 'collections/WPATH/WB/WB3', place : 'WB3'},
    { id: 'WBfour', name:'WB', url: 'collections/WPATH/WB/WB4', place : 'WB4'},
    { id: 'WBfive', name:'WB', url: 'collections/WPATH/WB/WB5', place : 'WB5'},
    { id: 'WBsix', name:'WB', url: 'collections/WPATH/WB/WB6', place : 'WB6'},
    { id: 'WBseven', name:'WB', url: 'collections/WPATH/WB/WB7', place : 'WB7'},
    { id: 'WBeight', name:'WB', url: 'collections/WPATH/WB/WB8', place : 'WB8'},
 
    //WPATH/WC
    { id: 'WCone', name:'WC', url: 'collections/WPATH/WC/WC1', place : 'WC1'},
    { id: 'WCtwo', name:'WC', url: 'collections/WPATH/WC/WC2', place : 'WC2'},
    { id: 'WCthree', name:'WC', url: 'collections/WPATH/WC/WC3', place : 'WC3'},
    { id: 'WCfour', name:'WC', url: 'collections/WPATH/WC/WC4', place : 'WC4'},
    { id: 'WCfive', name:'WC', url: 'collections/WPATH/WC/WC5', place : 'WC5'},
    { id: 'WCsix', name:'WC', url: 'collections/WPATH/WC/WC6', place : 'WC6'},
 
    //RPATH/R
    { id: 'Rone', name:'R', url: 'collections/RPATH/R/R1', place : 'R1'},
    { id: 'Rtwo', name:'R', url: 'collections/RPATH/R/R2', place : 'R2'},
    { id: 'Rthree', name:'R', url: 'collections/RPATH/R/R3', place : 'R3'},
    { id: 'Rfour', name:'R', url: 'collections/RPATH/R/R4', place : 'R4'},
    { id: 'Rfive', name:'R', url: 'collections/RPATH/R/R5', place : 'R5'},
    { id: 'Rsix', name:'R', url: 'collections/RPATH/R/R6', place : 'R6'},
    { id: 'Rseven', name:'R', url: 'collections/RPATH/R/R7', place : 'R7'},
    { id: 'Reight', name:'R', url: 'collections/RPATH/R/R8', place : 'R8'},
    { id: 'Rnine', name:'R', url: 'collections/RPATH/R/R9', place : 'R9'},
    { id: 'Rten', name:'R', url: 'collections/RPATH/R/R10', place : 'R10'},
 
    //RPATH//RA
    { id: 'RAone', name:'RA', url: 'collections/RPATH/RA/RA1', place : 'RA1'},
    { id: 'RAtwo', name:'RA', url: 'collections/RPATH/RA/RA2', place : 'RA2'},
    { id: 'RAthree', name:'RA', url: 'collections/RPATH/RA/RA3', place : 'RA3'},
    { id: 'RAfour', name:'RA', url: 'collections/RPATH/RA/RA4', place : 'RA4'},
    { id: 'RAfive', name:'RA', url: 'collections/RPATH/RA/RA5', place : 'RA5'},
    { id: 'RAsix', name:'RA', url: 'collections/RPATH/RA/RA6', place : 'RA6'},
    { id: 'RAseven', name:'RA', url: 'collections/RPATH/RA/RA7', place : 'RA7'},
    { id: 'RAeight', name:'RA', url: 'collections/RPATH/RA/RA8', place : 'RA8'},
    { id: 'RAnine', name:'RA', url: 'collections/RPATH/RA/RA9', place : 'RA9'},
    { id: 'RAten', name:'RA', url: 'collections/RPATH/RA/RA10', place : 'RA10'},
    { id: 'RAeleven', name:'RA', url: 'collections/RPATH/RA/RA11', place : 'RA11'},
 
    //RPATH/RB
    { id: 'RBone', name:'RB', url: 'collections/RPATH/RB/RB1', place : 'RB1'},
    { id: 'RBtwo', name:'RB', url: 'collections/RPATH/RB/RB2', place : 'RB2'},
    { id: 'RBthree', name:'RB', url: 'collections/RPATH/RB/RB3', place : 'RB3'},
    { id: 'RBfour', name:'RB', url: 'collections/RPATH/RB/RB4', place : 'RB4'},
    { id: 'RBfive', name:'RB', url: 'collections/RPATH/RB/RB5', place : 'RB5'},
    { id: 'RBsix', name:'RB', url: 'collections/RPATH/RB/RB6', place : 'RB6'},
    { id: 'RBseven', name:'RB', url: 'collections/RPATH/RB/RB7', place : 'RB7'},
    { id: 'RBeight', name:'RB', url: 'collections/RPATH/RB/RB8', place : 'RB8'},
    { id: 'RBnine', name:'RB', url: 'collections/RPATH/RB/RB9', place : 'RB9'},
    { id: 'RBten', name:'RB', url: 'collections/RPATH/RB/RB10', place : 'RB10'},
 
    //RPATH/RC
    { id: 'RCone', name:'RC', url: 'collections/RPATH/RC/RC1', place : 'RC1'},
    { id: 'RCtwo', name:'RC', url: 'collections/RPATH/RC/RC2', place : 'RC2'},
    { id: 'RCthree', name:'RC', url: 'collections/RPATH/RC/RC3', place : 'RC3'},
    { id: 'RCfour', name:'RC', url: 'collections/RPATH/RC/RC4', place : 'RC4'},
    { id: 'RCfive', name:'RC', url: 'collections/RPATH/RC/RC5', place : 'RC5'},
    { id: 'RCsix', name:'RC', url: 'collections/RPATH/RC/RC6', place : 'RC6'},
    { id: 'RCseven', name:'RC', url: 'collections/RPATH/RC/RC7', place : 'RC7'},
    { id: 'RCeight', name:'RC', url: 'collections/RPATH/RC/RC8', place : 'RC8'},
    { id: 'RCnine', name:'RC', url: 'collections/RPATH/RC/RC9', place : 'RC9'},
 
  ];
 
  useEffect(() => {
    const scene = document.querySelector('a-scene');
 
    const handleMarkerFound = (markerName, place) => {
      if (!detectedImages[markerName]) {
        alert(`${markerName} image detected`);
        setDetectedImages(prev => ({ ...prev, [markerName]: true }));
        localStorage.setItem('userLocation',markerName);
        localStorage.setItem('UserPosition',place)
        detectedImagesGlobal[markerName] = true;
        navigateAndCleanup();
      }
    };
 
    const navigateAndCleanup = () => {
      const video = document.querySelector('video');
      if (video) {
        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          video.srcObject = null;
        }
      }
 
      if (scene) {
        scene.parentNode.removeChild(scene);
        navigate("/");
        window.location.reload();
      }
    };
 
    markers.forEach(marker => {
      const markerElement = document.querySelector(`#${marker.id}`);
      if (markerElement) {
        const boundHandleMarkerFound = () => handleMarkerFound(marker.name, marker.place);
        markerElement.addEventListener('markerFound', boundHandleMarkerFound);
        markerElement.boundHandleMarkerFound = boundHandleMarkerFound;
      }
    });
 
    return () => {
      markers.forEach(marker => {
        const markerElement = document.querySelector(`#${marker.id}`);
        if (markerElement && markerElement.boundHandleMarkerFound) {
          markerElement.removeEventListener('markerFound', markerElement.boundHandleMarkerFound);
        }
      });
    };
  }, [navigate]);
 
  return (
    <div className='arjsmaindiv'>
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        {markers.map(marker => (
          <a-nft
            key={marker.id}
            id={marker.id}
            type="nft"
            url={marker.url}
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
          >
            <a-box position="0 0 -2" scale="20 20 20"></a-box>
          </a-nft>
        ))}
        <a-entity camera></a-entity>
      </a-scene>
      <div className = "arjsmsg">
        Please turn around and point your camera at the environment
      </div>
    </div>
  );
};
 
export default test;