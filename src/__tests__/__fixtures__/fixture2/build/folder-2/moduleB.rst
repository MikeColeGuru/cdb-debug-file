                                      1 ;--------------------------------------------------------
                                      2 ; File Created by SDCC : free open source ANSI-C Compiler
                                      3 ; Version 4.1.12 #12784 (Linux)
                                      4 ;--------------------------------------------------------
                                      5 	.module moduleB
                                      6 	.optsdcc -mmcs51 --model-small
                                      7 	
                                      8 ;--------------------------------------------------------
                                      9 ; Public variables in this module
                                     10 ;--------------------------------------------------------
                                     11 	.globl _add_PARM_2
                                     12 	.globl _add
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
                           000000    36 LmoduleB.add$b$1_0$2==.
      000015                         37 _add_PARM_2:
      000015                         38 	.ds 3
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
                                     95 ;Allocation info for local variables in function 'add'
                                     96 ;------------------------------------------------------------
                                     97 ;b                         Allocated with name '_add_PARM_2'
                                     98 ;a                         Allocated to registers r6 r7 
                                     99 ;------------------------------------------------------------
                           000000   100 	G$add$0$0 ==.
                           000000   101 	C$moduleB.c$4$0_0$3 ==.
                                    102 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:4: int add(int a, struct moduleB *b) {
                                    103 ;	-----------------------------------------
                                    104 ;	 function add
                                    105 ;	-----------------------------------------
      0000BA                        106 _add:
                           000007   107 	ar7 = 0x07
                           000006   108 	ar6 = 0x06
                           000005   109 	ar5 = 0x05
                           000004   110 	ar4 = 0x04
                           000003   111 	ar3 = 0x03
                           000002   112 	ar2 = 0x02
                           000001   113 	ar1 = 0x01
                           000000   114 	ar0 = 0x00
      0000BA AE 82            [24]  115 	mov	r6,dpl
      0000BC AF 83            [24]  116 	mov	r7,dph
                           000004   117 	C$moduleB.c$5$1_0$3 ==.
                                    118 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:5: if (b != NULL) {
      0000BE E5 15            [12]  119 	mov	a,_add_PARM_2
      0000C0 45 16            [12]  120 	orl	a,(_add_PARM_2 + 1)
      0000C2 60 1F            [24]  121 	jz	00102$
                           00000A   122 	C$moduleB.c$6$2_0$4 ==.
                                    123 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:6: return a + b->a;
      0000C4 AB 15            [24]  124 	mov	r3,_add_PARM_2
      0000C6 AC 16            [24]  125 	mov	r4,(_add_PARM_2 + 1)
      0000C8 AD 17            [24]  126 	mov	r5,(_add_PARM_2 + 2)
      0000CA 8B 82            [24]  127 	mov	dpl,r3
      0000CC 8C 83            [24]  128 	mov	dph,r4
      0000CE 8D F0            [24]  129 	mov	b,r5
      0000D0 12 00 E7         [24]  130 	lcall	__gptrget
      0000D3 FB               [12]  131 	mov	r3,a
      0000D4 A3               [24]  132 	inc	dptr
      0000D5 12 00 E7         [24]  133 	lcall	__gptrget
      0000D8 FC               [12]  134 	mov	r4,a
      0000D9 EB               [12]  135 	mov	a,r3
      0000DA 2E               [12]  136 	add	a,r6
      0000DB F5 82            [12]  137 	mov	dpl,a
      0000DD EC               [12]  138 	mov	a,r4
      0000DE 3F               [12]  139 	addc	a,r7
      0000DF F5 83            [12]  140 	mov	dph,a
      0000E1 80 03            [24]  141 	sjmp	00103$
      0000E3                        142 00102$:
                           000029   143 	C$moduleB.c$8$1_0$3 ==.
                                    144 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:8: return 0;
      0000E3 90 00 00         [24]  145 	mov	dptr,#0x0000
      0000E6                        146 00103$:
                           00002C   147 	C$moduleB.c$9$1_0$3 ==.
                                    148 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:9: }
                           00002C   149 	C$moduleB.c$9$1_0$3 ==.
                           00002C   150 	XG$add$0$0 ==.
      0000E6 22               [24]  151 	ret
                                    152 	.area CSEG    (CODE)
                                    153 	.area CONST   (CODE)
                                    154 	.area XINIT   (CODE)
                                    155 	.area CABS    (ABS,CODE)
