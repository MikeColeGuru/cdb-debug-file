/*
    CDB Debug File - Fixture 2
    Copyright (C) 2021 Mike Cole <MikeColeGuru@gmail.com>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; version 2 of the License

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA
*/

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
