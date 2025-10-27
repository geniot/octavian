package main

import (
	"testing"
	"time"
)

func assert(val1 int64, val2 int64, t *testing.T) {
	if val1 != val2 {
		t.Errorf("Expected: %v, Actual: %v", val1, val2)
		t.Fail()
	}
}

func TestSubscription(t *testing.T) {
	println(time.Now().UnixMilli() + MILLISECONDS_PER_DAY*365)
	assert(GetDays(0, 0), 0, t)
	assert(GetDays(1, 0), 0, t)
	assert(GetDays(0, 1), 1, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY-1), 1, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY), 1, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY+1), 2, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY*2-1), 2, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY*2), 2, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY*2+1), 3, t)
	assert(GetDays(0, MILLISECONDS_PER_DAY*100+1), 101, t)
}
