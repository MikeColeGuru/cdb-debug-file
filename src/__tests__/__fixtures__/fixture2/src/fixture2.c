#include "folder1/module→A.h"
#include "folder-2/moduleB.h"

void main() {
    volatile int a = 1;
    volatile int b = 2;
    volatile int c = sub(a, (char)b);
    volatile int d;
    struct moduleB e;

    e.a = 200;
    e.b = 201;
    e.c = 202;

    d = add(b, &e);
}
