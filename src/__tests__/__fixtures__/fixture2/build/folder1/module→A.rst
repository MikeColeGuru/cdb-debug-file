                                      1 ;--------------------------------------------------------
                                      2 ; File Created by SDCC : free open source ANSI-C Compiler
                                      3 ; Version 4.1.12 #12784 (Linux)
                                      4 ;--------------------------------------------------------
                                      5 	.module module___A
                                      6 	.optsdcc -mmcs51 --model-small
                                      7 	
                                      8 ;--------------------------------------------------------
                                      9 ; Public variables in this module
                                     10 ;--------------------------------------------------------
                                     11 	.globl _sub_PARM_2
                                     12 	.globl _sub
                                     13 ;--------------------------------------------------------
                                     14 ; special function registers
                                     15 ;--------------------------------------------------------
                                     16 	.area RSEG    (ABS,DATA)
      000000                         17 	.org 0x0000
                                     18 ;--------------------------------------------------------
                                     19 ; special function bits
                                     20 ;--------------------------------------------------------
                                     21 	.area RSEG    (ABS,DATA)
      000000                         22 	.org 0x0000
                                     23 ;--------------------------------------------------------
                                     24 ; overlayable register banks
                                     25 ;--------------------------------------------------------
                                     26 	.area REG_BANK_0	(REL,OVR,DATA)
      000000                         27 	.ds 8
                                     28 ;--------------------------------------------------------
                                     29 ; internal ram data
                                     30 ;--------------------------------------------------------
                                     31 	.area DSEG    (DATA)
                                     32 ;--------------------------------------------------------
                                     33 ; overlayable items in internal ram 
                                     34 ;--------------------------------------------------------
                                     35 	.area	OSEG    (OVR,DATA)
                           000000    36 Lmodule___A.sub$b$1_0$2==.
      000015                         37 _sub_PARM_2:
      000015                         38 	.ds 1
                                     39 ;--------------------------------------------------------
                                     40 ; indirectly addressable internal ram data
                                     41 ;--------------------------------------------------------
                                     42 	.area ISEG    (DATA)
                                     43 ;--------------------------------------------------------
                                     44 ; absolute internal ram data
                                     45 ;--------------------------------------------------------
                                     46 	.area IABS    (ABS,DATA)
                                     47 	.area IABS    (ABS,DATA)
                                     48 ;--------------------------------------------------------
                                     49 ; bit data
                                     50 ;--------------------------------------------------------
                                     51 	.area BSEG    (BIT)
                                     52 ;--------------------------------------------------------
                                     53 ; paged external ram data
                                     54 ;--------------------------------------------------------
                                     55 	.area PSEG    (PAG,XDATA)
                                     56 ;--------------------------------------------------------
                                     57 ; external ram data
                                     58 ;--------------------------------------------------------
                                     59 	.area XSEG    (XDATA)
                                     60 ;--------------------------------------------------------
                                     61 ; absolute external ram data
                                     62 ;--------------------------------------------------------
                                     63 	.area XABS    (ABS,XDATA)
                                     64 ;--------------------------------------------------------
                                     65 ; external initialized ram data
                                     66 ;--------------------------------------------------------
                                     67 	.area XISEG   (XDATA)
                                     68 	.area HOME    (CODE)
                                     69 	.area GSINIT0 (CODE)
                                     70 	.area GSINIT1 (CODE)
                                     71 	.area GSINIT2 (CODE)
                                     72 	.area GSINIT3 (CODE)
                                     73 	.area GSINIT4 (CODE)
                                     74 	.area GSINIT5 (CODE)
                                     75 	.area GSINIT  (CODE)
                                     76 	.area GSFINAL (CODE)
                                     77 	.area CSEG    (CODE)
                                     78 ;--------------------------------------------------------
                                     79 ; global & static initialisations
                                     80 ;--------------------------------------------------------
                                     81 	.area HOME    (CODE)
                                     82 	.area GSINIT  (CODE)
                                     83 	.area GSFINAL (CODE)
                                     84 	.area GSINIT  (CODE)
                                     85 ;--------------------------------------------------------
                                     86 ; Home
                                     87 ;--------------------------------------------------------
                                     88 	.area HOME    (CODE)
                                     89 	.area HOME    (CODE)
                                     90 ;--------------------------------------------------------
                                     91 ; code
                                     92 ;--------------------------------------------------------
                                     93 	.area CSEG    (CODE)
                                     94 ;------------------------------------------------------------
                                     95 ;Allocation info for local variables in function 'sub'
                                     96 ;------------------------------------------------------------
                                     97 ;b                         Allocated with name '_sub_PARM_2'
                                     98 ;a                         Allocated to registers r6 r7 
                                     99 ;------------------------------------------------------------
                           000000   100 	G$sub$0$0 ==.
                           000000   101 	C$module???A.c$3$0_0$3 ==.
                                    102 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder1/module???A.c:3: int sub(int a, char b) {
                                    103 ;	-----------------------------------------
                                    104 ;	 function sub
                                    105 ;	-----------------------------------------
      0000A8                        106 _sub:
                           000007   107 	ar7 = 0x07
                           000006   108 	ar6 = 0x06
                           000005   109 	ar5 = 0x05
                           000004   110 	ar4 = 0x04
                           000003   111 	ar3 = 0x03
                           000002   112 	ar2 = 0x02
                           000001   113 	ar1 = 0x01
                           000000   114 	ar0 = 0x00
      0000A8 AE 82            [24]  115 	mov	r6,dpl
      0000AA AF 83            [24]  116 	mov	r7,dph
                           000004   117 	C$module???A.c$4$1_0$3 ==.
                                    118 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder1/module???A.c:4: return a - b;
      0000AC AC 15            [24]  119 	mov	r4,_sub_PARM_2
      0000AE 7D 00            [12]  120 	mov	r5,#0x00
      0000B0 EE               [12]  121 	mov	a,r6
      0000B1 C3               [12]  122 	clr	c
      0000B2 9C               [12]  123 	subb	a,r4
      0000B3 F5 82            [12]  124 	mov	dpl,a
      0000B5 EF               [12]  125 	mov	a,r7
      0000B6 9D               [12]  126 	subb	a,r5
      0000B7 F5 83            [12]  127 	mov	dph,a
                           000011   128 	C$module???A.c$5$1_0$3 ==.
                                    129 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder1/module???A.c:5: }
                           000011   130 	C$module???A.c$5$1_0$3 ==.
                           000011   131 	XG$sub$0$0 ==.
      0000B9 22               [24]  132 	ret
                                    133 	.area CSEG    (CODE)
                                    134 	.area CONST   (CODE)
                                    135 	.area XINIT   (CODE)
                                    136 	.area CABS    (ABS,CODE)
