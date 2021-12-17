#include <stddef.h>
#include "moduleB.h"

int add(int a, struct moduleB *b) {
    if (b != NULL) {
        return a + b->a;
    } 
    return 0;
}

