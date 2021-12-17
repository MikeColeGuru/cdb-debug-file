                                      1 ;--------------------------------------------------------
                                      2 ; File Created by SDCC : free open source ANSI-C Compiler
                                      3 ; Version 4.1.12 #12784 (Linux)
                                      4 ;--------------------------------------------------------
                                      5 	.module fixture2
                                      6 	.optsdcc -mmcs51 --model-small
                                      7 	
                                      8 ;--------------------------------------------------------
                                      9 ; Public variables in this module
                                     10 ;--------------------------------------------------------
                                     11 	.globl _main
                                     12 	.globl _add
                                     13 	.globl _sub
                                     14 ;--------------------------------------------------------
                                     15 ; special function registers
                                     16 ;--------------------------------------------------------
                                     17 	.area RSEG    (ABS,DATA)
      000000                         18 	.org 0x0000
                                     19 ;--------------------------------------------------------
                                     20 ; special function bits
                                     21 ;--------------------------------------------------------
                                     22 	.area RSEG    (ABS,DATA)
      000000                         23 	.org 0x0000
                                     24 ;--------------------------------------------------------
                                     25 ; overlayable register banks
                                     26 ;--------------------------------------------------------
                                     27 	.area REG_BANK_0	(REL,OVR,DATA)
      000000                         28 	.ds 8
                                     29 ;--------------------------------------------------------
                                     30 ; internal ram data
                                     31 ;--------------------------------------------------------
                                     32 	.area DSEG    (DATA)
                           000000    33 Lfixture2.main$a$1_0$3==.
      000008                         34 _main_a_65536_3:
      000008                         35 	.ds 2
                           000002    36 Lfixture2.main$b$1_0$3==.
      00000A                         37 _main_b_65536_3:
      00000A                         38 	.ds 2
                           000004    39 Lfixture2.main$c$1_0$3==.
      00000C                         40 _main_c_65536_3:
      00000C                         41 	.ds 2
                           000006    42 Lfixture2.main$d$1_0$3==.
      00000E                         43 _main_d_65536_3:
      00000E                         44 	.ds 2
                           000008    45 Lfixture2.main$e$1_0$3==.
      000010                         46 _main_e_65536_3:
      000010                         47 	.ds 5
                                     48 ;--------------------------------------------------------
                                     49 ; overlayable items in internal ram 
                                     50 ;--------------------------------------------------------
                                     51 ;--------------------------------------------------------
                                     52 ; Stack segment in internal ram 
                                     53 ;--------------------------------------------------------
                                     54 	.area	SSEG
      000018                         55 __start__stack:
      000018                         56 	.ds	1
                                     57 
                                     58 ;--------------------------------------------------------
                                     59 ; indirectly addressable internal ram data
                                     60 ;--------------------------------------------------------
                                     61 	.area ISEG    (DATA)
                                     62 ;--------------------------------------------------------
                                     63 ; absolute internal ram data
                                     64 ;--------------------------------------------------------
                                     65 	.area IABS    (ABS,DATA)
                                     66 	.area IABS    (ABS,DATA)
                                     67 ;--------------------------------------------------------
                                     68 ; bit data
                                     69 ;--------------------------------------------------------
                                     70 	.area BSEG    (BIT)
                                     71 ;--------------------------------------------------------
                                     72 ; paged external ram data
                                     73 ;--------------------------------------------------------
                                     74 	.area PSEG    (PAG,XDATA)
                                     75 ;--------------------------------------------------------
                                     76 ; external ram data
                                     77 ;--------------------------------------------------------
                                     78 	.area XSEG    (XDATA)
                                     79 ;--------------------------------------------------------
                                     80 ; absolute external ram data
                                     81 ;--------------------------------------------------------
                                     82 	.area XABS    (ABS,XDATA)
                                     83 ;--------------------------------------------------------
                                     84 ; external initialized ram data
                                     85 ;--------------------------------------------------------
                                     86 	.area XISEG   (XDATA)
                                     87 	.area HOME    (CODE)
                                     88 	.area GSINIT0 (CODE)
                                     89 	.area GSINIT1 (CODE)
                                     90 	.area GSINIT2 (CODE)
                                     91 	.area GSINIT3 (CODE)
                                     92 	.area GSINIT4 (CODE)
                                     93 	.area GSINIT5 (CODE)
                                     94 	.area GSINIT  (CODE)
                                     95 	.area GSFINAL (CODE)
                                     96 	.area CSEG    (CODE)
                                     97 ;--------------------------------------------------------
                                     98 ; interrupt vector 
                                     99 ;--------------------------------------------------------
                                    100 	.area HOME    (CODE)
      000000                        101 __interrupt_vect:
      000000 02 00 06         [24]  102 	ljmp	__sdcc_gsinit_startup
                                    103 ;--------------------------------------------------------
                                    104 ; global & static initialisations
                                    105 ;--------------------------------------------------------
                                    106 	.area HOME    (CODE)
                                    107 	.area GSINIT  (CODE)
                                    108 	.area GSFINAL (CODE)
                                    109 	.area GSINIT  (CODE)
                                    110 	.globl __sdcc_gsinit_startup
                                    111 	.globl __sdcc_program_startup
                                    112 	.globl __start__stack
                                    113 	.globl __mcs51_genXINIT
                                    114 	.globl __mcs51_genXRAMCLEAR
                                    115 	.globl __mcs51_genRAMCLEAR
                                    116 	.area GSFINAL (CODE)
      00005F 02 00 03         [24]  117 	ljmp	__sdcc_program_startup
                                    118 ;--------------------------------------------------------
                                    119 ; Home
                                    120 ;--------------------------------------------------------
                                    121 	.area HOME    (CODE)
                                    122 	.area HOME    (CODE)
      000003                        123 __sdcc_program_startup:
      000003 02 00 62         [24]  124 	ljmp	_main
                                    125 ;	return from main will return to caller
                                    126 ;--------------------------------------------------------
                                    127 ; code
                                    128 ;--------------------------------------------------------
                                    129 	.area CSEG    (CODE)
                                    130 ;------------------------------------------------------------
                                    131 ;Allocation info for local variables in function 'main'
                                    132 ;------------------------------------------------------------
                                    133 ;a                         Allocated with name '_main_a_65536_3'
                                    134 ;b                         Allocated with name '_main_b_65536_3'
                                    135 ;c                         Allocated with name '_main_c_65536_3'
                                    136 ;d                         Allocated with name '_main_d_65536_3'
                                    137 ;e                         Allocated with name '_main_e_65536_3'
                                    138 ;------------------------------------------------------------
                           000000   139 	G$main$0$0 ==.
                           000000   140 	C$fixture2.c$4$0_0$3 ==.
                                    141 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:4: void main() {
                                    142 ;	-----------------------------------------
                                    143 ;	 function main
                                    144 ;	-----------------------------------------
      000062                        145 _main:
                           000007   146 	ar7 = 0x07
                           000006   147 	ar6 = 0x06
                           000005   148 	ar5 = 0x05
                           000004   149 	ar4 = 0x04
                           000003   150 	ar3 = 0x03
                           000002   151 	ar2 = 0x02
                           000001   152 	ar1 = 0x01
                           000000   153 	ar0 = 0x00
                           000000   154 	C$fixture2.c$5$2_0$3 ==.
                                    155 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:5: volatile int a = 1;
      000062 75 08 01         [24]  156 	mov	_main_a_65536_3,#0x01
      000065 75 09 00         [24]  157 	mov	(_main_a_65536_3 + 1),#0x00
                           000006   158 	C$fixture2.c$6$2_0$3 ==.
                                    159 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:6: volatile int b = 2;
      000068 75 0A 02         [24]  160 	mov	_main_b_65536_3,#0x02
      00006B 75 0B 00         [24]  161 	mov	(_main_b_65536_3 + 1),#0x00
                           00000C   162 	C$fixture2.c$7$1_0$3 ==.
                                    163 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:7: volatile int c = sub(a, (char)b);
      00006E 85 0A 15         [24]  164 	mov	_sub_PARM_2,_main_b_65536_3
      000071 85 08 82         [24]  165 	mov	dpl,_main_a_65536_3
      000074 85 09 83         [24]  166 	mov	dph,(_main_a_65536_3 + 1)
      000077 12 00 A8         [24]  167 	lcall	_sub
      00007A 85 82 0C         [24]  168 	mov	_main_c_65536_3,dpl
      00007D 85 83 0D         [24]  169 	mov	(_main_c_65536_3 + 1),dph
                           00001E   170 	C$fixture2.c$11$1_0$3 ==.
                                    171 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:11: e.a = 200;
      000080 75 10 C8         [24]  172 	mov	(_main_e_65536_3 + 0),#0xc8
      000083 75 11 00         [24]  173 	mov	(_main_e_65536_3 + 1),#0x00
                           000024   174 	C$fixture2.c$12$1_0$3 ==.
                                    175 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:12: e.b = 201;
      000086 75 12 C9         [24]  176 	mov	((_main_e_65536_3 + 0x0002) + 0),#0xc9
      000089 75 13 00         [24]  177 	mov	((_main_e_65536_3 + 0x0002) + 1),#0x00
                           00002A   178 	C$fixture2.c$13$1_0$3 ==.
                                    179 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:13: e.c = 202;
      00008C 75 14 CA         [24]  180 	mov	(_main_e_65536_3 + 0x0004),#0xca
                           00002D   181 	C$fixture2.c$15$1_0$3 ==.
                                    182 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:15: d = add(b, &e);
      00008F 75 15 10         [24]  183 	mov	_add_PARM_2,#_main_e_65536_3
      000092 75 16 00         [24]  184 	mov	(_add_PARM_2 + 1),#0x00
      000095 75 17 40         [24]  185 	mov	(_add_PARM_2 + 2),#0x40
      000098 85 0A 82         [24]  186 	mov	dpl,_main_b_65536_3
      00009B 85 0B 83         [24]  187 	mov	dph,(_main_b_65536_3 + 1)
      00009E 12 00 BA         [24]  188 	lcall	_add
      0000A1 85 82 0E         [24]  189 	mov	_main_d_65536_3,dpl
      0000A4 85 83 0F         [24]  190 	mov	(_main_d_65536_3 + 1),dph
                           000045   191 	C$fixture2.c$16$1_0$3 ==.
                                    192 ;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:16: }
                           000045   193 	C$fixture2.c$16$1_0$3 ==.
                           000045   194 	XG$main$0$0 ==.
      0000A7 22               [24]  195 	ret
                                    196 	.area CSEG    (CODE)
                                    197 	.area CONST   (CODE)
                                    198 	.area XINIT   (CODE)
                                    199 	.area CABS    (ABS,CODE)
