                                      1 ;--------------------------------------------------------
                                      2 ; File Created by SDCC : free open source ANSI-C Compiler
                                      3 ; Version 4.1.12 #12784 (Linux)
                                      4 ;--------------------------------------------------------
                                      5 	.module example2
                                      6 	.optsdcc -mmcs51 --model-small
                                      7 	
                                      8 ;--------------------------------------------------------
                                      9 ; Public variables in this module
                                     10 ;--------------------------------------------------------
                                     11 	.globl _main
                                     12 ;--------------------------------------------------------
                                     13 ; special function registers
                                     14 ;--------------------------------------------------------
                                     15 	.area RSEG    (ABS,DATA)
      000000                         16 	.org 0x0000
                                     17 ;--------------------------------------------------------
                                     18 ; special function bits
                                     19 ;--------------------------------------------------------
                                     20 	.area RSEG    (ABS,DATA)
      000000                         21 	.org 0x0000
                                     22 ;--------------------------------------------------------
                                     23 ; overlayable register banks
                                     24 ;--------------------------------------------------------
                                     25 	.area REG_BANK_0	(REL,OVR,DATA)
      000000                         26 	.ds 8
                                     27 ;--------------------------------------------------------
                                     28 ; internal ram data
                                     29 ;--------------------------------------------------------
                                     30 	.area DSEG    (DATA)
                                     31 ;--------------------------------------------------------
                                     32 ; overlayable items in internal ram 
                                     33 ;--------------------------------------------------------
                                     34 	.area	OSEG    (OVR,DATA)
                           000000    35 Lexample2.main$a$1_0$1==.
      000008                         36 _main_a_65536_1:
      000008                         37 	.ds 2
                           000002    38 Lexample2.main$b$1_0$1==.
      00000A                         39 _main_b_65536_1:
      00000A                         40 	.ds 2
                           000004    41 Lexample2.main$c$1_0$1==.
      00000C                         42 _main_c_65536_1:
      00000C                         43 	.ds 2
                                     44 ;--------------------------------------------------------
                                     45 ; Stack segment in internal ram 
                                     46 ;--------------------------------------------------------
                                     47 	.area	SSEG
      00000E                         48 __start__stack:
      00000E                         49 	.ds	1
                                     50 
                                     51 ;--------------------------------------------------------
                                     52 ; indirectly addressable internal ram data
                                     53 ;--------------------------------------------------------
                                     54 	.area ISEG    (DATA)
                                     55 ;--------------------------------------------------------
                                     56 ; absolute internal ram data
                                     57 ;--------------------------------------------------------
                                     58 	.area IABS    (ABS,DATA)
                                     59 	.area IABS    (ABS,DATA)
                                     60 ;--------------------------------------------------------
                                     61 ; bit data
                                     62 ;--------------------------------------------------------
                                     63 	.area BSEG    (BIT)
                                     64 ;--------------------------------------------------------
                                     65 ; paged external ram data
                                     66 ;--------------------------------------------------------
                                     67 	.area PSEG    (PAG,XDATA)
                                     68 ;--------------------------------------------------------
                                     69 ; external ram data
                                     70 ;--------------------------------------------------------
                                     71 	.area XSEG    (XDATA)
                                     72 ;--------------------------------------------------------
                                     73 ; absolute external ram data
                                     74 ;--------------------------------------------------------
                                     75 	.area XABS    (ABS,XDATA)
                                     76 ;--------------------------------------------------------
                                     77 ; external initialized ram data
                                     78 ;--------------------------------------------------------
                                     79 	.area XISEG   (XDATA)
                                     80 	.area HOME    (CODE)
                                     81 	.area GSINIT0 (CODE)
                                     82 	.area GSINIT1 (CODE)
                                     83 	.area GSINIT2 (CODE)
                                     84 	.area GSINIT3 (CODE)
                                     85 	.area GSINIT4 (CODE)
                                     86 	.area GSINIT5 (CODE)
                                     87 	.area GSINIT  (CODE)
                                     88 	.area GSFINAL (CODE)
                                     89 	.area CSEG    (CODE)
                                     90 ;--------------------------------------------------------
                                     91 ; interrupt vector 
                                     92 ;--------------------------------------------------------
                                     93 	.area HOME    (CODE)
      000000                         94 __interrupt_vect:
      000000 02 00 06         [24]   95 	ljmp	__sdcc_gsinit_startup
                                     96 ;--------------------------------------------------------
                                     97 ; global & static initialisations
                                     98 ;--------------------------------------------------------
                                     99 	.area HOME    (CODE)
                                    100 	.area GSINIT  (CODE)
                                    101 	.area GSFINAL (CODE)
                                    102 	.area GSINIT  (CODE)
                                    103 	.globl __sdcc_gsinit_startup
                                    104 	.globl __sdcc_program_startup
                                    105 	.globl __start__stack
                                    106 	.globl __mcs51_genXINIT
                                    107 	.globl __mcs51_genXRAMCLEAR
                                    108 	.globl __mcs51_genRAMCLEAR
                                    109 	.area GSFINAL (CODE)
      00005F 02 00 03         [24]  110 	ljmp	__sdcc_program_startup
                                    111 ;--------------------------------------------------------
                                    112 ; Home
                                    113 ;--------------------------------------------------------
                                    114 	.area HOME    (CODE)
                                    115 	.area HOME    (CODE)
      000003                        116 __sdcc_program_startup:
      000003 02 00 62         [24]  117 	ljmp	_main
                                    118 ;	return from main will return to caller
                                    119 ;--------------------------------------------------------
                                    120 ; code
                                    121 ;--------------------------------------------------------
                                    122 	.area CSEG    (CODE)
                                    123 ;------------------------------------------------------------
                                    124 ;Allocation info for local variables in function 'main'
                                    125 ;------------------------------------------------------------
                                    126 ;a                         Allocated with name '_main_a_65536_1'
                                    127 ;b                         Allocated with name '_main_b_65536_1'
                                    128 ;c                         Allocated with name '_main_c_65536_1'
                                    129 ;------------------------------------------------------------
                           000000   130 	G$main$0$0 ==.
                           000000   131 	C$example2.c$1$0_0$1 ==.
                                    132 ;	../src/example2.c:1: void main() {
                                    133 ;	-----------------------------------------
                                    134 ;	 function main
                                    135 ;	-----------------------------------------
      000062                        136 _main:
                           000007   137 	ar7 = 0x07
                           000006   138 	ar6 = 0x06
                           000005   139 	ar5 = 0x05
                           000004   140 	ar4 = 0x04
                           000003   141 	ar3 = 0x03
                           000002   142 	ar2 = 0x02
                           000001   143 	ar1 = 0x01
                           000000   144 	ar0 = 0x00
                           000000   145 	C$example2.c$2$2_0$1 ==.
                                    146 ;	../src/example2.c:2: volatile int a = 1;
      000062 75 08 01         [24]  147 	mov	_main_a_65536_1,#0x01
      000065 75 09 00         [24]  148 	mov	(_main_a_65536_1 + 1),#0x00
                           000006   149 	C$example2.c$3$2_0$1 ==.
                                    150 ;	../src/example2.c:3: volatile int b = 2;
      000068 75 0A 02         [24]  151 	mov	_main_b_65536_1,#0x02
      00006B 75 0B 00         [24]  152 	mov	(_main_b_65536_1 + 1),#0x00
                           00000C   153 	C$example2.c$4$1_0$1 ==.
                                    154 ;	../src/example2.c:4: volatile int c = a + b;
      00006E E5 0A            [12]  155 	mov	a,_main_b_65536_1
      000070 25 08            [12]  156 	add	a,_main_a_65536_1
      000072 F5 0C            [12]  157 	mov	_main_c_65536_1,a
      000074 E5 0B            [12]  158 	mov	a,(_main_b_65536_1 + 1)
      000076 35 09            [12]  159 	addc	a,(_main_a_65536_1 + 1)
      000078 F5 0D            [12]  160 	mov	(_main_c_65536_1 + 1),a
                           000018   161 	C$example2.c$5$1_0$1 ==.
                                    162 ;	../src/example2.c:5: }
                           000018   163 	C$example2.c$5$1_0$1 ==.
                           000018   164 	XG$main$0$0 ==.
      00007A 22               [24]  165 	ret
                                    166 	.area CSEG    (CODE)
                                    167 	.area CONST   (CODE)
                                    168 	.area XINIT   (CODE)
                                    169 	.area CABS    (ABS,CODE)
