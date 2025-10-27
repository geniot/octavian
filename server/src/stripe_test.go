package main

import (
	"testing"
)

func TestBonuses(t *testing.T) {
	assert(GetDaysWithBonus(0), 0, t)
	assert(GetDaysWithBonus(1), 1, t)
	assert(GetDaysWithBonus(19), 19, t)
	assert(GetDaysWithBonus(20), 30, t)
	assert(GetDaysWithBonus(21), 31, t)
	assert(GetDaysWithBonus(30), 45, t)
	assert(GetDaysWithBonus(50), 100, t)
	assert(GetDaysWithBonus(80), 200, t)
	assert(GetDaysWithBonus(120), 360, t)
	assert(GetDaysWithBonus(200), 700, t)
	assert(GetDaysWithBonus(250), 1000, t)
	assert(GetDaysWithBonus(300), 1350, t)
	assert(GetDaysWithBonus(365), 1825, t)
}
