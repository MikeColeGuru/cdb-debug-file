;--------------------------------------------------------
; File Created by SDCC : free open source ANSI-C Compiler
; Version 4.1.12 #12784 (Linux)
;--------------------------------------------------------
	.module fixture2
	.optsdcc -mmcs51 --model-small
	
;--------------------------------------------------------
; Public variables in this module
;--------------------------------------------------------
	.globl _main
	.globl _add
	.globl _sub
;--------------------------------------------------------
; special function registers
;--------------------------------------------------------
	.area RSEG    (ABS,DATA)
	.org 0x0000
;--------------------------------------------------------
; special function bits
;--------------------------------------------------------
	.area RSEG    (ABS,DATA)
	.org 0x0000
;--------------------------------------------------------
; overlayable register banks
;--------------------------------------------------------
	.area REG_BANK_0	(REL,OVR,DATA)
	.ds 8
;--------------------------------------------------------
; internal ram data
;--------------------------------------------------------
	.area DSEG    (DATA)
Lfixture2.main$a$1_0$3==.
_main_a_65536_3:
	.ds 2
Lfixture2.main$b$1_0$3==.
_main_b_65536_3:
	.ds 2
Lfixture2.main$c$1_0$3==.
_main_c_65536_3:
	.ds 2
Lfixture2.main$d$1_0$3==.
_main_d_65536_3:
	.ds 2
Lfixture2.main$e$1_0$3==.
_main_e_65536_3:
	.ds 5
;--------------------------------------------------------
; overlayable items in internal ram 
;--------------------------------------------------------
;--------------------------------------------------------
; Stack segment in internal ram 
;--------------------------------------------------------
	.area	SSEG
__start__stack:
	.ds	1

;--------------------------------------------------------
; indirectly addressable internal ram data
;--------------------------------------------------------
	.area ISEG    (DATA)
;--------------------------------------------------------
; absolute internal ram data
;--------------------------------------------------------
	.area IABS    (ABS,DATA)
	.area IABS    (ABS,DATA)
;--------------------------------------------------------
; bit data
;--------------------------------------------------------
	.area BSEG    (BIT)
;--------------------------------------------------------
; paged external ram data
;--------------------------------------------------------
	.area PSEG    (PAG,XDATA)
;--------------------------------------------------------
; external ram data
;--------------------------------------------------------
	.area XSEG    (XDATA)
;--------------------------------------------------------
; absolute external ram data
;--------------------------------------------------------
	.area XABS    (ABS,XDATA)
;--------------------------------------------------------
; external initialized ram data
;--------------------------------------------------------
	.area XISEG   (XDATA)
	.area HOME    (CODE)
	.area GSINIT0 (CODE)
	.area GSINIT1 (CODE)
	.area GSINIT2 (CODE)
	.area GSINIT3 (CODE)
	.area GSINIT4 (CODE)
	.area GSINIT5 (CODE)
	.area GSINIT  (CODE)
	.area GSFINAL (CODE)
	.area CSEG    (CODE)
;--------------------------------------------------------
; interrupt vector 
;--------------------------------------------------------
	.area HOME    (CODE)
__interrupt_vect:
	ljmp	__sdcc_gsinit_startup
;--------------------------------------------------------
; global & static initialisations
;--------------------------------------------------------
	.area HOME    (CODE)
	.area GSINIT  (CODE)
	.area GSFINAL (CODE)
	.area GSINIT  (CODE)
	.globl __sdcc_gsinit_startup
	.globl __sdcc_program_startup
	.globl __start__stack
	.globl __mcs51_genXINIT
	.globl __mcs51_genXRAMCLEAR
	.globl __mcs51_genRAMCLEAR
	.area GSFINAL (CODE)
	ljmp	__sdcc_program_startup
;--------------------------------------------------------
; Home
;--------------------------------------------------------
	.area HOME    (CODE)
	.area HOME    (CODE)
__sdcc_program_startup:
	ljmp	_main
;	return from main will return to caller
;--------------------------------------------------------
; code
;--------------------------------------------------------
	.area CSEG    (CODE)
;------------------------------------------------------------
;Allocation info for local variables in function 'main'
;------------------------------------------------------------
;a                         Allocated with name '_main_a_65536_3'
;b                         Allocated with name '_main_b_65536_3'
;c                         Allocated with name '_main_c_65536_3'
;d                         Allocated with name '_main_d_65536_3'
;e                         Allocated with name '_main_e_65536_3'
;------------------------------------------------------------
	G$main$0$0 ==.
	C$fixture2.c$4$0_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:4: void main() {
;	-----------------------------------------
;	 function main
;	-----------------------------------------
_main:
	ar7 = 0x07
	ar6 = 0x06
	ar5 = 0x05
	ar4 = 0x04
	ar3 = 0x03
	ar2 = 0x02
	ar1 = 0x01
	ar0 = 0x00
	C$fixture2.c$5$2_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:5: volatile int a = 1;
	mov	_main_a_65536_3,#0x01
	mov	(_main_a_65536_3 + 1),#0x00
	C$fixture2.c$6$2_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:6: volatile int b = 2;
	mov	_main_b_65536_3,#0x02
	mov	(_main_b_65536_3 + 1),#0x00
	C$fixture2.c$7$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:7: volatile int c = sub(a, (char)b);
	mov	_sub_PARM_2,_main_b_65536_3
	mov	dpl,_main_a_65536_3
	mov	dph,(_main_a_65536_3 + 1)
	lcall	_sub
	mov	_main_c_65536_3,dpl
	mov	(_main_c_65536_3 + 1),dph
	C$fixture2.c$11$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:11: e.a = 200;
	mov	(_main_e_65536_3 + 0),#0xc8
	mov	(_main_e_65536_3 + 1),#0x00
	C$fixture2.c$12$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:12: e.b = 201;
	mov	((_main_e_65536_3 + 0x0002) + 0),#0xc9
	mov	((_main_e_65536_3 + 0x0002) + 1),#0x00
	C$fixture2.c$13$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:13: e.c = 202;
	mov	(_main_e_65536_3 + 0x0004),#0xca
	C$fixture2.c$15$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:15: d = add(b, &e);
	mov	_add_PARM_2,#_main_e_65536_3
	mov	(_add_PARM_2 + 1),#0x00
	mov	(_add_PARM_2 + 2),#0x40
	mov	dpl,_main_b_65536_3
	mov	dph,(_main_b_65536_3 + 1)
	lcall	_add
	mov	_main_d_65536_3,dpl
	mov	(_main_d_65536_3 + 1),dph
	C$fixture2.c$16$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/./fixture2.c:16: }
	C$fixture2.c$16$1_0$3 ==.
	XG$main$0$0 ==.
	ret
	.area CSEG    (CODE)
	.area CONST   (CODE)
	.area XINIT   (CODE)
	.area CABS    (ABS,CODE)
