;--------------------------------------------------------
; File Created by SDCC : free open source ANSI-C Compiler
; Version 4.1.12 #12784 (Linux)
;--------------------------------------------------------
	.module moduleB
	.optsdcc -mmcs51 --model-small
	
;--------------------------------------------------------
; Public variables in this module
;--------------------------------------------------------
	.globl _add_PARM_2
	.globl _add
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
;--------------------------------------------------------
; overlayable items in internal ram 
;--------------------------------------------------------
	.area	OSEG    (OVR,DATA)
LmoduleB.add$b$1_0$2==.
_add_PARM_2:
	.ds 3
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
; global & static initialisations
;--------------------------------------------------------
	.area HOME    (CODE)
	.area GSINIT  (CODE)
	.area GSFINAL (CODE)
	.area GSINIT  (CODE)
;--------------------------------------------------------
; Home
;--------------------------------------------------------
	.area HOME    (CODE)
	.area HOME    (CODE)
;--------------------------------------------------------
; code
;--------------------------------------------------------
	.area CSEG    (CODE)
;------------------------------------------------------------
;Allocation info for local variables in function 'add'
;------------------------------------------------------------
;b                         Allocated with name '_add_PARM_2'
;a                         Allocated to registers r6 r7 
;------------------------------------------------------------
	G$add$0$0 ==.
	C$moduleB.c$4$0_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:4: int add(int a, struct moduleB *b) {
;	-----------------------------------------
;	 function add
;	-----------------------------------------
_add:
	ar7 = 0x07
	ar6 = 0x06
	ar5 = 0x05
	ar4 = 0x04
	ar3 = 0x03
	ar2 = 0x02
	ar1 = 0x01
	ar0 = 0x00
	mov	r6,dpl
	mov	r7,dph
	C$moduleB.c$5$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:5: if (b != NULL) {
	mov	a,_add_PARM_2
	orl	a,(_add_PARM_2 + 1)
	jz	00102$
	C$moduleB.c$6$2_0$4 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:6: return a + b->a;
	mov	r3,_add_PARM_2
	mov	r4,(_add_PARM_2 + 1)
	mov	r5,(_add_PARM_2 + 2)
	mov	dpl,r3
	mov	dph,r4
	mov	b,r5
	lcall	__gptrget
	mov	r3,a
	inc	dptr
	lcall	__gptrget
	mov	r4,a
	mov	a,r3
	add	a,r6
	mov	dpl,a
	mov	a,r4
	addc	a,r7
	mov	dph,a
	sjmp	00103$
00102$:
	C$moduleB.c$8$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:8: return 0;
	mov	dptr,#0x0000
00103$:
	C$moduleB.c$9$1_0$3 ==.
;	/home/draco/Projects/cdb-debug-file/src/__tests__/__fixtures__/fixture2/src/folder-2/moduleB.c:9: }
	C$moduleB.c$9$1_0$3 ==.
	XG$add$0$0 ==.
	ret
	.area CSEG    (CODE)
	.area CONST   (CODE)
	.area XINIT   (CODE)
	.area CABS    (ABS,CODE)
