
TARGET=fixture1.ihx

CC=sdcc
AS=sdas8051
LD=sdld

CFLAGS = --debug -mmcs51 --model-small
LINKFLAGS = -Wl"-y -j -u" --model-small --stack-auto --out-fmt-ihx -llibsdcc.lib

SOURCE = fixture1.c

OBJ=$(SOURCE:.c=.rel)

all: $(TARGET)

clean: 
	rm -f *.adb *.asm *.ihx *.map *.omf *.cdb *.sym *.rst *.rel *.omf *.mem *.lst *.lk

$(TARGET): $(OBJ)
	$(CC) $(LINKFLAGS) -o $@ $^

%.rel: %.c
	$(CC) $(CFLAGS) -c $< -o $@
