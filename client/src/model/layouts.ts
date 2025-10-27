/**
 * x - column
 * y - row
 * v - note value
 * c - color (0 - white, 1 - black)
 */
import {Chord} from "./enums/chord";
import {Bass} from "./bass";
import {Instrument} from "./enums/instrument";

/**
 * RIGHT HAND GRIFF LAYOUTS
 */

export const RIGHT_HAND_MIRROR_92_C_GRIFF_EUROPE_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[

    {x:4,y:0,v:51,c:1},{x:4,y:1,v:54,c:1},{x:4,y:2,v:57,c:0},{x:4,y:3,v:60,c:0},{x:4,y:4,v:63,c:1},
    {x:4,y:5,v:66,c:1},{x:4,y:6,v:69,c:0},{x:4,y:7,v:72,c:0},{x:4,y:8,v:75,c:1},{x:4,y:9,v:78,c:1},
    {x:4,y:10,v:81,c:0},{x:4,y:11,v:84,c:0},{x:4,y:12,v:87,c:1},{x:4,y:13,v:90,c:1},{x:4,y:14,v:93,c:0},
    {x:4,y:15,v:96,c:0},{x:4,y:16,v:99,c:1},{x:4,y:17,v:102,c:1},

    {x:3,y:0,v:49,c:1},{x:3,y:1,v:52,c:0},{x:3,y:2,v:55,c:0},{x:3,y:3,v:58,c:1},{x:3,y:4,v:61,c:1},
    {x:3,y:5,v:64,c:0},{x:3,y:6,v:67,c:0},{x:3,y:7,v:70,c:1},{x:3,y:8,v:73,c:1},{x:3,y:9,v:76,c:0},
    {x:3,y:10,v:79,c:0},{x:3,y:11,v:82,c:1},{x:3,y:12,v:85,c:1},{x:3,y:13,v:88,c:0},{x:3,y:14,v:91,c:0},
    {x:3,y:15,v:94,c:1},{x:3,y:16,v:97,c:1},{x:3,y:17,v:100,c:0},{x:3,y:18,v:103,c:0},

    {x:2,y:1,v:50,c:0},{x:2,y:2,v:53,c:0},{x:2,y:3,v:56,c:1},{x:2,y:4,v:59,c:0},{x:2,y:5,v:62,c:0},
    {x:2,y:6,v:65,c:0},{x:2,y:7,v:68,c:1},{x:2,y:8,v:71,c:0},{x:2,y:9,v:74,c:0},{x:2,y:10,v:77,c:0},
    {x:2,y:11,v:80,c:1},{x:2,y:12,v:83,c:0},{x:2,y:13,v:86,c:0},{x:2,y:14,v:89,c:0},{x:2,y:15,v:92,c:1},
    {x:2,y:16,v:95,c:0},{x:2,y:17,v:98,c:0},{x:2,y:18,v:101,c:0},

    {x:1,y:1,v:48,c:0},{x:1,y:2,v:51,c:1},{x:1,y:3,v:54,c:1},{x:1,y:4,v:57,c:0},{x:1,y:5,v:60,c:0},
    {x:1,y:6,v:63,c:1},{x:1,y:7,v:66,c:1},{x:1,y:8,v:69,c:0},{x:1,y:9,v:72,c:0},{x:1,y:10,v:75,c:1},
    {x:1,y:11,v:78,c:1},{x:1,y:12,v:81,c:0},{x:1,y:13,v:84,c:0},{x:1,y:14,v:87,c:1},{x:1,y:15,v:90,c:1},
    {x:1,y:16,v:93,c:0},{x:1,y:17,v:96,c:0},{x:1,y:18,v:99,c:1},{x:1,y:19,v:102,c:1},

    {x:0,y:2,v:49,c:1},{x:0,y:3,v:52,c:0},{x:0,y:4,v:55,c:0},{x:0,y:5,v:58,c:1},{x:0,y:6,v:61,c:1},
    {x:0,y:7,v:64,c:0},{x:0,y:8,v:67,c:0},{x:0,y:9,v:70,c:1},{x:0,y:10,v:73,c:1},{x:0,y:11,v:76,c:0},
    {x:0,y:12,v:79,c:0},{x:0,y:13,v:82,c:1},{x:0,y:14,v:85,c:1},{x:0,y:15,v:88,c:0},{x:0,y:16,v:91,c:0},
    {x:0,y:17,v:94,c:1},{x:0,y:18,v:97,c:1},{x:0,y:19,v:100,c:0},

  ]
};


export const RIGHT_HAND_TEACHER_92_C_GRIFF_EUROPE_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:0,y:2,v:51,c:1},{x:0,y:3,v:54,c:1},{x:0,y:4,v:57,c:0},{x:0,y:5,v:60,c:0},{x:0,y:6,v:63,c:1},
    {x:0,y:7,v:66,c:1},{x:0,y:8,v:69,c:0},{x:0,y:9,v:72,c:0},{x:0,y:10,v:75,c:1},{x:0,y:11,v:78,c:1},
    {x:0,y:12,v:81,c:0},{x:0,y:13,v:84,c:0},{x:0,y:14,v:87,c:1},{x:0,y:15,v:90,c:1},{x:0,y:16,v:93,c:0},
    {x:0,y:17,v:96,c:0},{x:0,y:18,v:99,c:1},{x:0,y:19,v:102,c:1},

    {x:1,y:1,v:49,c:1},{x:1,y:2,v:52,c:0},{x:1,y:3,v:55,c:0},{x:1,y:4,v:58,c:1},{x:1,y:5,v:61,c:1},
    {x:1,y:6,v:64,c:0},{x:1,y:7,v:67,c:0},{x:1,y:8,v:70,c:1},{x:1,y:9,v:73,c:1},{x:1,y:10,v:76,c:0},
    {x:1,y:11,v:79,c:0},{x:1,y:12,v:82,c:1},{x:1,y:13,v:85,c:1},{x:1,y:14,v:88,c:0},{x:1,y:15,v:91,c:0},
    {x:1,y:16,v:94,c:1},{x:1,y:17,v:97,c:1},{x:1,y:18,v:100,c:0},{x:1,y:19,v:103,c:0},

    {x:2,y:1,v:50,c:0},{x:2,y:2,v:53,c:0},{x:2,y:3,v:56,c:1},{x:2,y:4,v:59,c:0},{x:2,y:5,v:62,c:0},
    {x:2,y:6,v:65,c:0},{x:2,y:7,v:68,c:1},{x:2,y:8,v:71,c:0},{x:2,y:9,v:74,c:0},{x:2,y:10,v:77,c:0},
    {x:2,y:11,v:80,c:1},{x:2,y:12,v:83,c:0},{x:2,y:13,v:86,c:0},{x:2,y:14,v:89,c:0},{x:2,y:15,v:92,c:1},
    {x:2,y:16,v:95,c:0},{x:2,y:17,v:98,c:0},{x:2,y:18,v:101,c:0},

    {x:3,y:0,v:48,c:0},{x:3,y:1,v:51,c:1},{x:3,y:2,v:54,c:1},{x:3,y:3,v:57,c:0},{x:3,y:4,v:60,c:0},
    {x:3,y:5,v:63,c:1},{x:3,y:6,v:66,c:1},{x:3,y:7,v:69,c:0},{x:3,y:8,v:72,c:0},{x:3,y:9,v:75,c:1},
    {x:3,y:10,v:78,c:1},{x:3,y:11,v:81,c:0},{x:3,y:12,v:84,c:0},{x:3,y:13,v:87,c:1},{x:3,y:14,v:90,c:1},
    {x:3,y:15,v:93,c:0},{x:3,y:16,v:96,c:0},{x:3,y:17,v:99,c:1},{x:3,y:18,v:102,c:1},

    {x:4,y:0,v:49,c:1},{x:4,y:1,v:52,c:0},{x:4,y:2,v:55,c:0},{x:4,y:3,v:58,c:1},{x:4,y:4,v:61,c:1},
    {x:4,y:5,v:64,c:0},{x:4,y:6,v:67,c:0},{x:4,y:7,v:70,c:1},{x:4,y:8,v:73,c:1},{x:4,y:9,v:76,c:0},
    {x:4,y:10,v:79,c:0},{x:4,y:11,v:82,c:1},{x:4,y:12,v:85,c:1},{x:4,y:13,v:88,c:0},{x:4,y:14,v:91,c:0},
    {x:4,y:15,v:94,c:1},{x:4,y:16,v:97,c:1},{x:4,y:17,v:100,c:0}
  ]
};

export const RIGHT_HAND_MIRROR_92_C_GRIFF_2_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[

    {x:4,y:0,v:51,c:1},{x:4,y:1,v:54,c:1},{x:4,y:2,v:57,c:0},{x:4,y:3,v:60,c:0},{x:4,y:4,v:63,c:1},
    {x:4,y:5,v:66,c:1},{x:4,y:6,v:69,c:0},{x:4,y:7,v:72,c:0},{x:4,y:8,v:75,c:1},{x:4,y:9,v:78,c:1},
    {x:4,y:10,v:81,c:0},{x:4,y:11,v:84,c:0},{x:4,y:12,v:87,c:1},{x:4,y:13,v:90,c:1},{x:4,y:14,v:93,c:0},
    {x:4,y:15,v:96,c:0},{x:4,y:16,v:99,c:1},{x:4,y:17,v:102,c:1},

    {x:3,y:0,v:50,c:0},{x:3,y:1,v:53,c:0},{x:3,y:2,v:56,c:1},{x:3,y:3,v:59,c:0},{x:3,y:4,v:62,c:0},
    {x:3,y:5,v:65,c:0},{x:3,y:6,v:68,c:1},{x:3,y:7,v:71,c:0},{x:3,y:8,v:74,c:0},{x:3,y:9,v:77,c:0},
    {x:3,y:10,v:80,c:1},{x:3,y:11,v:83,c:0},{x:3,y:12,v:86,c:0},{x:3,y:13,v:89,c:0},{x:3,y:14,v:92,c:1},
    {x:3,y:15,v:95,c:0},{x:3,y:16,v:98,c:0},{x:3,y:17,v:101,c:0},{x:3,y:18,v:104,c:1},

    {x:2,y:1,v:52,c:0},{x:2,y:2,v:55,c:0},{x:2,y:3,v:58,c:1},{x:2,y:4,v:61,c:1},{x:2,y:5,v:64,c:0},
    {x:2,y:6,v:67,c:0},{x:2,y:7,v:70,c:1},{x:2,y:8,v:73,c:1},{x:2,y:9,v:76,c:0},{x:2,y:10,v:79,c:0},
    {x:2,y:11,v:82,c:1},{x:2,y:12,v:85,c:1},{x:2,y:13,v:88,c:0},{x:2,y:14,v:91,c:0},{x:2,y:15,v:94,c:1},
    {x:2,y:16,v:97,c:1},{x:2,y:17,v:100,c:0},{x:2,y:18,v:103,c:0},

    {x:1,y:1,v:51,c:1},{x:1,y:2,v:54,c:1},{x:1,y:3,v:57,c:0},{x:1,y:4,v:60,c:0},{x:1,y:5,v:63,c:1},
    {x:1,y:6,v:66,c:1},{x:1,y:7,v:69,c:0},{x:1,y:8,v:72,c:0},{x:1,y:9,v:75,c:1},{x:1,y:10,v:78,c:1},
    {x:1,y:11,v:81,c:0},{x:1,y:12,v:84,c:0},{x:1,y:13,v:87,c:1},{x:1,y:14,v:90,c:1},{x:1,y:15,v:93,c:0},
    {x:1,y:16,v:96,c:0},{x:1,y:17,v:99,c:1},{x:1,y:18,v:102,c:1},{x:1,y:19,v:105,c:0},

    {x:0,y:2,v:53,c:0},{x:0,y:3,v:56,c:1},{x:0,y:4,v:59,c:0},{x:0,y:5,v:62,c:0},{x:0,y:6,v:65,c:0},
    {x:0,y:7,v:68,c:1},{x:0,y:8,v:71,c:0},{x:0,y:9,v:74,c:0},{x:0,y:10,v:77,c:0},{x:0,y:11,v:80,c:1},
    {x:0,y:12,v:83,c:0},{x:0,y:13,v:86,c:0},{x:0,y:14,v:89,c:0},{x:0,y:15,v:92,c:1},{x:0,y:16,v:95,c:0},
    {x:0,y:17,v:98,c:0},{x:0,y:18,v:101,c:0},{x:0,y:19,v:104,c:1},

  ]
};

export const RIGHT_HAND_TEACHER_92_C_GRIFF_2_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:0,y:2,v:51,c:1},{x:0,y:3,v:54,c:1},{x:0,y:4,v:57,c:0},{x:0,y:5,v:60,c:0},{x:0,y:6,v:63,c:1},
    {x:0,y:7,v:66,c:1},{x:0,y:8,v:69,c:0},{x:0,y:9,v:72,c:0},{x:0,y:10,v:75,c:1},{x:0,y:11,v:78,c:1},
    {x:0,y:12,v:81,c:0},{x:0,y:13,v:84,c:0},{x:0,y:14,v:87,c:1},{x:0,y:15,v:90,c:1},{x:0,y:16,v:93,c:0},
    {x:0,y:17,v:96,c:0},{x:0,y:18,v:99,c:1},{x:0,y:19,v:102,c:1},

    {x:1,y:1,v:50,c:0},{x:1,y:2,v:53,c:0},{x:1,y:3,v:56,c:1},{x:1,y:4,v:59,c:0},{x:1,y:5,v:62,c:0},
    {x:1,y:6,v:65,c:0},{x:1,y:7,v:68,c:1},{x:1,y:8,v:71,c:0},{x:1,y:9,v:74,c:0},{x:1,y:10,v:77,c:0},
    {x:1,y:11,v:80,c:1},{x:1,y:12,v:83,c:0},{x:1,y:13,v:86,c:0},{x:1,y:14,v:89,c:0},{x:1,y:15,v:92,c:1},
    {x:1,y:16,v:95,c:0},{x:1,y:17,v:98,c:0},{x:1,y:18,v:101,c:0},{x:1,y:19,v:104,c:1},

    {x:2,y:1,v:52,c:0},{x:2,y:2,v:55,c:0},{x:2,y:3,v:58,c:1},{x:2,y:4,v:61,c:1},{x:2,y:5,v:64,c:0},
    {x:2,y:6,v:67,c:0},{x:2,y:7,v:70,c:1},{x:2,y:8,v:73,c:1},{x:2,y:9,v:76,c:0},{x:2,y:10,v:79,c:0},
    {x:2,y:11,v:82,c:1},{x:2,y:12,v:85,c:1},{x:2,y:13,v:88,c:0},{x:2,y:14,v:91,c:0},{x:2,y:15,v:94,c:1},
    {x:2,y:16,v:97,c:1},{x:2,y:17,v:100,c:0},{x:2,y:18,v:103,c:0},

    {x:3,y:0,v:51,c:1},{x:3,y:1,v:54,c:1},{x:3,y:2,v:57,c:0},{x:3,y:3,v:60,c:0},{x:3,y:4,v:63,c:1},
    {x:3,y:5,v:66,c:1},{x:3,y:6,v:69,c:0},{x:3,y:7,v:72,c:0},{x:3,y:8,v:75,c:1},{x:3,y:9,v:78,c:1},
    {x:3,y:10,v:81,c:0},{x:3,y:11,v:84,c:0},{x:3,y:12,v:87,c:1},{x:3,y:13,v:90,c:1},{x:3,y:14,v:93,c:0},
    {x:3,y:15,v:96,c:0},{x:3,y:16,v:99,c:1},{x:3,y:17,v:102,c:1},{x:3,y:18,v:105,c:0},

    {x:4,y:0,v:53,c:0},{x:4,y:1,v:56,c:1},{x:4,y:2,v:59,c:0},{x:4,y:3,v:62,c:0},{x:4,y:4,v:65,c:0},
    {x:4,y:5,v:68,c:1},{x:4,y:6,v:71,c:0},{x:4,y:7,v:74,c:0},{x:4,y:8,v:77,c:0},{x:4,y:9,v:80,c:1},
    {x:4,y:10,v:83,c:0},{x:4,y:11,v:86,c:0},{x:4,y:12,v:89,c:0},{x:4,y:13,v:92,c:1},{x:4,y:14,v:95,c:0},
    {x:4,y:15,v:98,c:0},{x:4,y:16,v:101,c:0},{x:4,y:17,v:104,c:1}
  ]
};

export const RIGHT_HAND_MIRROR_92_B_GRIFF_BAJAN_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:4,y:0,v:50,c:0},{x:4,y:1,v:53,c:0},{x:4,y:2,v:56,c:1},{x:4,y:3,v:59,c:0},{x:4,y:4,v:62,c:0},{x:4,y:5,v:65,c:0},{x:4,y:6,v:68,c:1},{x:4,y:7,v:71,c:0},
    {x:4,y:8,v:74,c:0},{x:4,y:9,v:77,c:0},{x:4,y:10,v:80,c:1},{x:4,y:11,v:83,c:0},{x:4,y:12,v:86,c:0},{x:4,y:13,v:89,c:0},
    {x:4,y:14,v:92,c:1},{x:4,y:15,v:95,c:0},{x:4,y:16,v:98,c:0},{x:4,y:17,v:101,c:0},

    {x:3,y:0,v:49,c:1},{x:3,y:1,v:52,c:0},{x:3,y:2,v:55,c:0},{x:3,y:3,v:58,c:1},{x:3,y:4,v:61,c:1},{x:3,y:5,v:64,c:0},{x:3,y:6,v:67,c:0},{x:3,y:7,v:70,c:1},
    {x:3,y:8,v:73,c:1},{x:3,y:9,v:76,c:0},{x:3,y:10,v:79,c:0},{x:3,y:11,v:82,c:1},{x:3,y:12,v:85,c:1},{x:3,y:13,v:88,c:0},
    {x:3,y:14,v:91,c:0},{x:3,y:15,v:94,c:1},{x:3,y:16,v:97,c:1},{x:3,y:17,v:100,c:0},{x:3,y:18,v:103,c:0},

    {x:2,y:1,v:51,c:1},{x:2,y:2,v:54,c:1},{x:2,y:3,v:57,c:0},{x:2,y:4,v:60,c:0},{x:2,y:5,v:63,c:1},{x:2,y:6,v:66,c:1},{x:2,y:7,v:69,c:0},
    {x:2,y:8,v:72,c:0},{x:2,y:9,v:75,c:1},{x:2,y:10,v:78,c:1},{x:2,y:11,v:81,c:0},{x:2,y:12,v:84,c:0},{x:2,y:13,v:87,c:1},
    {x:2,y:14,v:90,c:1},{x:2,y:15,v:93,c:0},{x:2,y:16,v:96,c:0},{x:2,y:17,v:99,c:1},{x:2,y:18,v:102,c:1},

    {x:1,y:1,v:50,c:0},{x:1,y:2,v:53,c:0},{x:1,y:3,v:56,c:1},{x:1,y:4,v:59,c:0},{x:1,y:5,v:62,c:0},{x:1,y:6,v:65,c:0},{x:1,y:7,v:68,c:1},
    {x:1,y:8,v:71,c:0},{x:1,y:9,v:74,c:0},{x:1,y:10,v:77,c:0},{x:1,y:11,v:80,c:1},{x:1,y:12,v:83,c:0},{x:1,y:13,v:86,c:0},
    {x:1,y:14,v:89,c:0},{x:1,y:15,v:92,c:1},{x:1,y:16,v:95,c:0},{x:1,y:17,v:98,c:0},{x:1,y:18,v:101,c:0},{x:1,y:19,v:104,c:1},

    {x:0,y:2,v:52,c:0},{x:0,y:3,v:55,c:0},{x:0,y:4,v:58,c:1},{x:0,y:5,v:61,c:1},{x:0,y:6,v:64,c:0},{x:0,y:7,v:67,c:0},
    {x:0,y:8,v:70,c:1},{x:0,y:9,v:73,c:1},{x:0,y:10,v:76,c:0},{x:0,y:11,v:79,c:0},{x:0,y:12,v:82,c:1},{x:0,y:13,v:85,c:1},
    {x:0,y:14,v:88,c:0},{x:0,y:15,v:91,c:0},{x:0,y:16,v:94,c:1},{x:0,y:17,v:97,c:1},{x:0,y:18,v:100,c:0},{x:0,y:19,v:103,c:0},

  ]
};

export const RIGHT_HAND_TEACHER_92_B_GRIFF_BAJAN_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:0,y:2,v:50,c:0},{x:0,y:3,v:53,c:0},{x:0,y:4,v:56,c:1},{x:0,y:5,v:59,c:0},{x:0,y:6,v:62,c:0},
    {x:0,y:7,v:65,c:0},{x:0,y:8,v:68,c:1},{x:0,y:9,v:71,c:0},{x:0,y:10,v:74,c:0},{x:0,y:11,v:77,c:0},
    {x:0,y:12,v:80,c:1},{x:0,y:13,v:83,c:0},{x:0,y:14,v:86,c:0},{x:0,y:15,v:89,c:0},{x:0,y:16,v:92,c:1},
    {x:0,y:17,v:95,c:0},{x:0,y:18,v:98,c:0},{x:0,y:19,v:101,c:0},

    {x:1,y:1,v:49,c:1},{x:1,y:2,v:52,c:0},{x:1,y:3,v:55,c:0},{x:1,y:4,v:58,c:1},{x:1,y:5,v:61,c:1},
    {x:1,y:6,v:64,c:0},{x:1,y:7,v:67,c:0},{x:1,y:8,v:70,c:1},{x:1,y:9,v:73,c:1},{x:1,y:10,v:76,c:0},
    {x:1,y:11,v:79,c:0},{x:1,y:12,v:82,c:1},{x:1,y:13,v:85,c:1},{x:1,y:14,v:88,c:0},{x:1,y:15,v:91,c:0},
    {x:1,y:16,v:94,c:1},{x:1,y:17,v:97,c:1},{x:1,y:18,v:100,c:0},{x:1,y:19,v:103,c:0},

    {x:2,y:1,v:51,c:1},{x:2,y:2,v:54,c:1},{x:2,y:3,v:57,c:0},{x:2,y:4,v:60,c:0},{x:2,y:5,v:63,c:1},
    {x:2,y:6,v:66,c:1},{x:2,y:7,v:69,c:0},{x:2,y:8,v:72,c:0},{x:2,y:9,v:75,c:1},{x:2,y:10,v:78,c:1},
    {x:2,y:11,v:81,c:0},{x:2,y:12,v:84,c:0},{x:2,y:13,v:87,c:1},{x:2,y:14,v:90,c:1},{x:2,y:15,v:93,c:0},
    {x:2,y:16,v:96,c:0},{x:2,y:17,v:99,c:1},{x:2,y:18,v:102,c:1},

    {x:3,y:0,v:50,c:0},{x:3,y:1,v:53,c:0},{x:3,y:2,v:56,c:1},{x:3,y:3,v:59,c:0},{x:3,y:4,v:62,c:0},
    {x:3,y:5,v:65,c:0},{x:3,y:6,v:68,c:1},{x:3,y:7,v:71,c:0},{x:3,y:8,v:74,c:0},{x:3,y:9,v:77,c:0},
    {x:3,y:10,v:80,c:1},{x:3,y:11,v:83,c:0},{x:3,y:12,v:86,c:0},{x:3,y:13,v:89,c:0},{x:3,y:14,v:92,c:1},
    {x:3,y:15,v:95,c:0},{x:3,y:16,v:98,c:0},{x:3,y:17,v:101,c:0},{x:3,y:18,v:104,c:1},

    {x:4,y:0,v:52,c:0},{x:4,y:1,v:55,c:0},{x:4,y:2,v:58,c:1},{x:4,y:3,v:61,c:1},{x:4,y:4,v:64,c:0},
    {x:4,y:5,v:67,c:0},{x:4,y:6,v:70,c:1},{x:4,y:7,v:73,c:1},{x:4,y:8,v:76,c:0},{x:4,y:9,v:79,c:0},
    {x:4,y:10,v:82,c:1},{x:4,y:11,v:85,c:1},{x:4,y:12,v:88,c:0},{x:4,y:13,v:91,c:0},{x:4,y:14,v:94,c:1},
    {x:4,y:15,v:97,c:1},{x:4,y:16,v:100,c:0},{x:4,y:17,v:103,c:0}
  ]
};

export const RIGHT_HAND_MIRROR_92_C_GRIFF_FINN_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[

    {x:4,y:0,v:52,c:0},{x:4,y:1,v:55,c:0},{x:4,y:2,v:58,c:1},{x:4,y:3,v:61,c:1},{x:4,y:4,v:64,c:0},
    {x:4,y:5,v:67,c:0},{x:4,y:6,v:70,c:1},{x:4,y:7,v:73,c:1},{x:4,y:8,v:76,c:0},{x:4,y:9,v:79,c:0},
    {x:4,y:10,v:82,c:1},{x:4,y:11,v:85,c:1},{x:4,y:12,v:88,c:0},{x:4,y:13,v:91,c:0},{x:4,y:14,v:94,c:1},
    {x:4,y:15,v:97,c:1},{x:4,y:16,v:100,c:0},{x:4,y:17,v:103,c:0},

    {x:3,y:0,v:50,c:0},{x:3,y:1,v:53,c:0},{x:3,y:2,v:56,c:1},{x:3,y:3,v:59,c:0},{x:3,y:4,v:62,c:0},
    {x:3,y:5,v:65,c:0},{x:3,y:6,v:68,c:1},{x:3,y:7,v:71,c:0},{x:3,y:8,v:74,c:0},{x:3,y:9,v:77,c:0},
    {x:3,y:10,v:80,c:1},{x:3,y:11,v:83,c:0},{x:3,y:12,v:86,c:0},{x:3,y:13,v:89,c:0},{x:3,y:14,v:92,c:1},
    {x:3,y:15,v:95,c:0},{x:3,y:16,v:98,c:0},{x:3,y:17,v:101,c:0},{x:3,y:18,v:104,c:1},

    {x:2,y:1,v:51,c:1},{x:2,y:2,v:54,c:1},{x:2,y:3,v:57,c:0},{x:2,y:4,v:60,c:0},{x:2,y:5,v:63,c:1},
    {x:2,y:6,v:66,c:1},{x:2,y:7,v:69,c:0},{x:2,y:8,v:72,c:0},{x:2,y:9,v:75,c:1},{x:2,y:10,v:78,c:1},
    {x:2,y:11,v:81,c:0},{x:2,y:12,v:84,c:0},{x:2,y:13,v:87,c:1},{x:2,y:14,v:90,c:1},{x:2,y:15,v:93,c:0},
    {x:2,y:16,v:96,c:0},{x:2,y:17,v:99,c:1},{x:2,y:18,v:102,c:1},

    {x:1,y:1,v:49,c:1},{x:1,y:2,v:52,c:0},{x:1,y:3,v:55,c:0},{x:1,y:4,v:58,c:1},{x:1,y:5,v:61,c:1},
    {x:1,y:6,v:64,c:0},{x:1,y:7,v:67,c:0},{x:1,y:8,v:70,c:1},{x:1,y:9,v:73,c:1},{x:1,y:10,v:76,c:0},
    {x:1,y:11,v:79,c:0},{x:1,y:12,v:82,c:1},{x:1,y:13,v:85,c:1},{x:1,y:14,v:88,c:0},{x:1,y:15,v:91,c:0},
    {x:1,y:16,v:94,c:1},{x:1,y:17,v:97,c:1},{x:1,y:18,v:100,c:0},{x:1,y:19,v:103,c:0},

    {x:0,y:2,v:50,c:0},{x:0,y:3,v:53,c:0},{x:0,y:4,v:56,c:1},{x:0,y:5,v:59,c:0},{x:0,y:6,v:62,c:0},
    {x:0,y:7,v:65,c:0},{x:0,y:8,v:68,c:1},{x:0,y:9,v:71,c:0},{x:0,y:10,v:74,c:0},{x:0,y:11,v:77,c:0},
    {x:0,y:12,v:80,c:1},{x:0,y:13,v:83,c:0},{x:0,y:14,v:86,c:0},{x:0,y:15,v:89,c:0},{x:0,y:16,v:92,c:1},
    {x:0,y:17,v:95,c:0},{x:0,y:18,v:98,c:0},{x:0,y:19,v:101,c:0},

  ]
};

export const RIGHT_HAND_TEACHER_92_C_GRIFF_FINN_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:0,y:2,v:52,c:0},{x:0,y:3,v:55,c:0},{x:0,y:4,v:58,c:1},{x:0,y:5,v:61,c:1},{x:0,y:6,v:64,c:0},
    {x:0,y:7,v:67,c:0},{x:0,y:8,v:70,c:1},{x:0,y:9,v:73,c:1},{x:0,y:10,v:76,c:0},{x:0,y:11,v:79,c:0},
    {x:0,y:12,v:82,c:1},{x:0,y:13,v:85,c:1},{x:0,y:14,v:88,c:0},{x:0,y:15,v:91,c:0},{x:0,y:16,v:94,c:1},
    {x:0,y:17,v:97,c:1},{x:0,y:18,v:100,c:0},{x:0,y:19,v:103,c:0},

    {x:1,y:1,v:50,c:0},{x:1,y:2,v:53,c:0},{x:1,y:3,v:56,c:1},{x:1,y:4,v:59,c:0},{x:1,y:5,v:62,c:0},
    {x:1,y:6,v:65,c:0},{x:1,y:7,v:68,c:1},{x:1,y:8,v:71,c:0},{x:1,y:9,v:74,c:0},{x:1,y:10,v:77,c:0},
    {x:1,y:11,v:80,c:1},{x:1,y:12,v:83,c:0},{x:1,y:13,v:86,c:0},{x:1,y:14,v:89,c:0},{x:1,y:15,v:92,c:1},
    {x:1,y:16,v:95,c:0},{x:1,y:17,v:98,c:0},{x:1,y:18,v:101,c:0},{x:1,y:19,v:104,c:1},

    {x:2,y:1,v:51,c:1},{x:2,y:2,v:54,c:1},{x:2,y:3,v:57,c:0},{x:2,y:4,v:60,c:0},{x:2,y:5,v:63,c:1},
    {x:2,y:6,v:66,c:1},{x:2,y:7,v:69,c:0},{x:2,y:8,v:72,c:0},{x:2,y:9,v:75,c:1},{x:2,y:10,v:78,c:1},
    {x:2,y:11,v:81,c:0},{x:2,y:12,v:84,c:0},{x:2,y:13,v:87,c:1},{x:2,y:14,v:90,c:1},{x:2,y:15,v:93,c:0},
    {x:2,y:16,v:96,c:0},{x:2,y:17,v:99,c:1},{x:2,y:18,v:102,c:1},

    {x:3,y:0,v:49,c:1},{x:3,y:1,v:52,c:0},{x:3,y:2,v:55,c:0},{x:3,y:3,v:58,c:1},{x:3,y:4,v:61,c:1},
    {x:3,y:5,v:64,c:0},{x:3,y:6,v:67,c:0},{x:3,y:7,v:70,c:1},{x:3,y:8,v:73,c:1},{x:3,y:9,v:76,c:0},
    {x:3,y:10,v:79,c:0},{x:3,y:11,v:82,c:1},{x:3,y:12,v:85,c:1},{x:3,y:13,v:88,c:0},{x:3,y:14,v:91,c:0},
    {x:3,y:15,v:94,c:1},{x:3,y:16,v:97,c:1},{x:3,y:17,v:100,c:0},{x:3,y:18,v:103,c:0},

    {x:4,y:0,v:50,c:0},{x:4,y:1,v:53,c:0},{x:4,y:2,v:56,c:1},{x:4,y:3,v:59,c:0},{x:4,y:4,v:62,c:0},
    {x:4,y:5,v:65,c:0},{x:4,y:6,v:68,c:1},{x:4,y:7,v:71,c:0},{x:4,y:8,v:74,c:0},{x:4,y:9,v:77,c:0},
    {x:4,y:10,v:80,c:1},{x:4,y:11,v:83,c:0},{x:4,y:12,v:86,c:0},{x:4,y:13,v:89,c:0},{x:4,y:14,v:92,c:1},
    {x:4,y:15,v:95,c:0},{x:4,y:16,v:98,c:0},{x:4,y:17,v:101,c:0}
  ]
};

export const RIGHT_HAND_MIRROR_92_D_GRIFF_1_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[

    {x:4,y:0,v:50,c:0},{x:4,y:1,v:53,c:0},{x:4,y:2,v:56,c:1},{x:4,y:3,v:59,c:0},{x:4,y:4,v:62,c:0},
    {x:4,y:5,v:65,c:0},{x:4,y:6,v:68,c:1},{x:4,y:7,v:71,c:0},{x:4,y:8,v:74,c:0},{x:4,y:9,v:77,c:0},
    {x:4,y:10,v:80,c:1},{x:4,y:11,v:83,c:0},{x:4,y:12,v:86,c:0},{x:4,y:13,v:89,c:0},{x:4,y:14,v:92,c:1},
    {x:4,y:15,v:95,c:0},{x:4,y:16,v:98,c:0},{x:4,y:17,v:101,c:0},

    {x:3,y:0,v:48,c:0},{x:3,y:1,v:51,c:1},{x:3,y:2,v:54,c:1},{x:3,y:3,v:57,c:0},{x:3,y:4,v:60,c:0},
    {x:3,y:5,v:63,c:1},{x:3,y:6,v:66,c:1},{x:3,y:7,v:69,c:0},{x:3,y:8,v:72,c:0},{x:3,y:9,v:75,c:1},
    {x:3,y:10,v:78,c:1},{x:3,y:11,v:81,c:0},{x:3,y:12,v:84,c:0},{x:3,y:13,v:87,c:1},{x:3,y:14,v:90,c:1},
    {x:3,y:15,v:93,c:0},{x:3,y:16,v:96,c:0},{x:3,y:17,v:99,c:1},{x:3,y:18,v:102,c:1},

    {x:2,y:1,v:49,c:1},{x:2,y:2,v:52,c:0},{x:2,y:3,v:55,c:0},{x:2,y:4,v:58,c:1},{x:2,y:5,v:61,c:1},
    {x:2,y:6,v:64,c:0},{x:2,y:7,v:67,c:0},{x:2,y:8,v:70,c:1},{x:2,y:9,v:73,c:1},{x:2,y:10,v:76,c:0},
    {x:2,y:11,v:79,c:0},{x:2,y:12,v:82,c:1},{x:2,y:13,v:85,c:1},{x:2,y:14,v:88,c:0},{x:2,y:15,v:91,c:0},
    {x:2,y:16,v:94,c:1},{x:2,y:17,v:97,c:1},{x:2,y:18,v:100,c:0},

    {x:1,y:1,v:47,c:0},{x:1,y:2,v:50,c:0},{x:1,y:3,v:53,c:0},{x:1,y:4,v:56,c:1},{x:1,y:5,v:59,c:0},
    {x:1,y:6,v:62,c:0},{x:1,y:7,v:65,c:0},{x:1,y:8,v:68,c:1},{x:1,y:9,v:71,c:0},{x:1,y:10,v:74,c:0},
    {x:1,y:11,v:77,c:0},{x:1,y:12,v:80,c:1},{x:1,y:13,v:83,c:0},{x:1,y:14,v:86,c:0},{x:1,y:15,v:89,c:0},
    {x:1,y:16,v:92,c:1},{x:1,y:17,v:95,c:0},{x:1,y:18,v:98,c:0},{x:1,y:19,v:101,c:0},

    {x:0,y:2,v:48,c:0},{x:0,y:3,v:51,c:1},{x:0,y:4,v:54,c:1},{x:0,y:5,v:57,c:0},{x:0,y:6,v:60,c:0},
    {x:0,y:7,v:63,c:1},{x:0,y:8,v:66,c:1},{x:0,y:9,v:69,c:0},{x:0,y:10,v:72,c:0},{x:0,y:11,v:75,c:1},
    {x:0,y:12,v:78,c:1},{x:0,y:13,v:81,c:0},{x:0,y:14,v:84,c:0},{x:0,y:15,v:87,c:1},{x:0,y:16,v:90,c:1},
    {x:0,y:17,v:93,c:0},{x:0,y:18,v:96,c:0},{x:0,y:19,v:99,c:1},

  ]
};

export const RIGHT_HAND_TEACHER_92_D_GRIFF_1_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:0,y:2,v:50,c:0},{x:0,y:3,v:53,c:0},{x:0,y:4,v:56,c:1},{x:0,y:5,v:59,c:0},{x:0,y:6,v:62,c:0},
    {x:0,y:7,v:65,c:0},{x:0,y:8,v:68,c:1},{x:0,y:9,v:71,c:0},{x:0,y:10,v:74,c:0},{x:0,y:11,v:77,c:0},
    {x:0,y:12,v:80,c:1},{x:0,y:13,v:83,c:0},{x:0,y:14,v:86,c:0},{x:0,y:15,v:89,c:0},{x:0,y:16,v:92,c:1},
    {x:0,y:17,v:95,c:0},{x:0,y:18,v:98,c:0},{x:0,y:19,v:101,c:0},

    {x:1,y:1,v:48,c:0},{x:1,y:2,v:51,c:1},{x:1,y:3,v:54,c:1},{x:1,y:4,v:57,c:0},{x:1,y:5,v:60,c:0},
    {x:1,y:6,v:63,c:1},{x:1,y:7,v:66,c:1},{x:1,y:8,v:69,c:0},{x:1,y:9,v:72,c:0},{x:1,y:10,v:75,c:1},
    {x:1,y:11,v:78,c:1},{x:1,y:12,v:81,c:0},{x:1,y:13,v:84,c:0},{x:1,y:14,v:87,c:1},{x:1,y:15,v:90,c:1},
    {x:1,y:16,v:93,c:0},{x:1,y:17,v:96,c:0},{x:1,y:18,v:99,c:1},{x:1,y:19,v:102,c:1},

    {x:2,y:1,v:49,c:1},{x:2,y:2,v:52,c:0},{x:2,y:3,v:55,c:0},{x:2,y:4,v:58,c:1},{x:2,y:5,v:61,c:1},
    {x:2,y:6,v:64,c:0},{x:2,y:7,v:67,c:0},{x:2,y:8,v:70,c:1},{x:2,y:9,v:73,c:1},{x:2,y:10,v:76,c:0},
    {x:2,y:11,v:79,c:0},{x:2,y:12,v:82,c:1},{x:2,y:13,v:85,c:1},{x:2,y:14,v:88,c:0},{x:2,y:15,v:91,c:0},
    {x:2,y:16,v:94,c:1},{x:2,y:17,v:97,c:1},{x:2,y:18,v:100,c:0},

    {x:3,y:0,v:47,c:0},{x:3,y:1,v:50,c:0},{x:3,y:2,v:53,c:0},{x:3,y:3,v:56,c:1},{x:3,y:4,v:59,c:0},
    {x:3,y:5,v:62,c:0},{x:3,y:6,v:65,c:0},{x:3,y:7,v:68,c:1},{x:3,y:8,v:71,c:0},{x:3,y:9,v:74,c:0},
    {x:3,y:10,v:77,c:0},{x:3,y:11,v:80,c:1},{x:3,y:12,v:83,c:0},{x:3,y:13,v:86,c:0},{x:3,y:14,v:89,c:0},
    {x:3,y:15,v:92,c:1},{x:3,y:16,v:95,c:0},{x:3,y:17,v:98,c:0},{x:3,y:18,v:101,c:0},

    {x:4,y:0,v:48,c:0},{x:4,y:1,v:51,c:1},{x:4,y:2,v:54,c:1},{x:4,y:3,v:57,c:0},{x:4,y:4,v:60,c:0},
    {x:4,y:5,v:63,c:1},{x:4,y:6,v:66,c:1},{x:4,y:7,v:69,c:0},{x:4,y:8,v:72,c:0},{x:4,y:9,v:75,c:1},
    {x:4,y:10,v:78,c:1},{x:4,y:11,v:81,c:0},{x:4,y:12,v:84,c:0},{x:4,y:13,v:87,c:1},{x:4,y:14,v:90,c:1},
    {x:4,y:15,v:93,c:0},{x:4,y:16,v:96,c:0},{x:4,y:17,v:99,c:1}
  ]
};

export const RIGHT_HAND_MIRROR_92_D_GRIFF_2_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:4,y:0,v:49,c:1},{x:4,y:1,v:52,c:0},{x:4,y:2,v:55,c:0},{x:4,y:3,v:58,c:1},{x:4,y:4,v:61,c:1},
    {x:4,y:5,v:64,c:0},{x:4,y:6,v:67,c:0},{x:4,y:7,v:70,c:1},{x:4,y:8,v:73,c:1},{x:4,y:9,v:76,c:0},
    {x:4,y:10,v:79,c:0},{x:4,y:11,v:82,c:1},{x:4,y:12,v:85,c:1},{x:4,y:13,v:88,c:0},{x:4,y:14,v:91,c:0},
    {x:4,y:15,v:94,c:1},{x:4,y:16,v:97,c:1},{x:4,y:17,v:100,c:0},

    {x:3,y:0,v:48,c:0},{x:3,y:1,v:51,c:1},{x:3,y:2,v:54,c:1},{x:3,y:3,v:57,c:0},{x:3,y:4,v:60,c:0},
    {x:3,y:5,v:63,c:1},{x:3,y:6,v:66,c:1},{x:3,y:7,v:69,c:0},{x:3,y:8,v:72,c:0},{x:3,y:9,v:75,c:1},
    {x:3,y:10,v:78,c:1},{x:3,y:11,v:81,c:0},{x:3,y:12,v:84,c:0},{x:3,y:13,v:87,c:1},{x:3,y:14,v:90,c:1},
    {x:3,y:15,v:93,c:0},{x:3,y:16,v:96,c:0},{x:3,y:17,v:99,c:1},{x:3,y:18,v:102,c:1},

    {x:2,y:1,v:50,c:0},{x:2,y:2,v:53,c:0},{x:2,y:3,v:56,c:1},{x:2,y:4,v:59,c:0},{x:2,y:5,v:62,c:0},
    {x:2,y:6,v:65,c:0},{x:2,y:7,v:68,c:1},{x:2,y:8,v:71,c:0},{x:2,y:9,v:74,c:0},{x:2,y:10,v:77,c:0},
    {x:2,y:11,v:80,c:1},{x:2,y:12,v:83,c:0},{x:2,y:13,v:86,c:0},{x:2,y:14,v:89,c:0},{x:2,y:15,v:92,c:1},
    {x:2,y:16,v:95,c:0},{x:2,y:17,v:98,c:0},{x:2,y:18,v:101,c:0},

    {x:1,y:1,v:49,c:1},{x:1,y:2,v:52,c:0},{x:1,y:3,v:55,c:0},{x:1,y:4,v:58,c:1},{x:1,y:5,v:61,c:1},
    {x:1,y:6,v:64,c:0},{x:1,y:7,v:67,c:0},{x:1,y:8,v:70,c:1},{x:1,y:9,v:73,c:1},{x:1,y:10,v:76,c:0},
    {x:1,y:11,v:79,c:0},{x:1,y:12,v:82,c:1},{x:1,y:13,v:85,c:1},{x:1,y:14,v:88,c:0},{x:1,y:15,v:91,c:0},
    {x:1,y:16,v:94,c:1},{x:1,y:17,v:97,c:1},{x:1,y:18,v:100,c:0},{x:1,y:19,v:103,c:0},

    {x:0,y:2,v:51,c:1},{x:0,y:3,v:54,c:1},{x:0,y:4,v:57,c:0},{x:0,y:5,v:60,c:0},{x:0,y:6,v:63,c:1},
    {x:0,y:7,v:66,c:1},{x:0,y:8,v:69,c:0},{x:0,y:9,v:72,c:0},{x:0,y:10,v:75,c:1},{x:0,y:11,v:78,c:1},
    {x:0,y:12,v:81,c:0},{x:0,y:13,v:84,c:0},{x:0,y:14,v:87,c:1},{x:0,y:15,v:90,c:1},{x:0,y:16,v:93,c:0},
    {x:0,y:17,v:96,c:0},{x:0,y:18,v:99,c:1},{x:0,y:19,v:102,c:1},

  ]
};


export const RIGHT_HAND_TEACHER_92_D_GRIFF_2_LAYOUT = {
  rows:20,
  columns:5,
  verticalSkewFactor:2,
  radiusFactor:1,
  cellFactor:1,
  offsetYFactor:1,
  offsetXFactor:1,

  keys:[
    {x:0,y:2,v:49,c:1},{x:0,y:3,v:52,c:0},{x:0,y:4,v:55,c:0},{x:0,y:5,v:58,c:1},{x:0,y:6,v:61,c:1},
    {x:0,y:7,v:64,c:0},{x:0,y:8,v:67,c:0},{x:0,y:9,v:70,c:1},{x:0,y:10,v:73,c:1},{x:0,y:11,v:76,c:0},
    {x:0,y:12,v:79,c:0},{x:0,y:13,v:82,c:1},{x:0,y:14,v:85,c:1},{x:0,y:15,v:88,c:0},{x:0,y:16,v:91,c:0},
    {x:0,y:17,v:94,c:1},{x:0,y:18,v:97,c:1},{x:0,y:19,v:100,c:0},

    {x:1,y:1,v:48,c:0},{x:1,y:2,v:51,c:1},{x:1,y:3,v:54,c:1},{x:1,y:4,v:57,c:0},{x:1,y:5,v:60,c:0},
    {x:1,y:6,v:63,c:1},{x:1,y:7,v:66,c:1},{x:1,y:8,v:69,c:0},{x:1,y:9,v:72,c:0},{x:1,y:10,v:75,c:1},
    {x:1,y:11,v:78,c:1},{x:1,y:12,v:81,c:0},{x:1,y:13,v:84,c:0},{x:1,y:14,v:87,c:1},{x:1,y:15,v:90,c:1},
    {x:1,y:16,v:93,c:0},{x:1,y:17,v:96,c:0},{x:1,y:18,v:99,c:1},{x:1,y:19,v:102,c:1},

    {x:2,y:1,v:50,c:0},{x:2,y:2,v:53,c:0},{x:2,y:3,v:56,c:1},{x:2,y:4,v:59,c:0},{x:2,y:5,v:62,c:0},
    {x:2,y:6,v:65,c:0},{x:2,y:7,v:68,c:1},{x:2,y:8,v:71,c:0},{x:2,y:9,v:74,c:0},{x:2,y:10,v:77,c:0},
    {x:2,y:11,v:80,c:1},{x:2,y:12,v:83,c:0},{x:2,y:13,v:86,c:0},{x:2,y:14,v:89,c:0},{x:2,y:15,v:92,c:1},
    {x:2,y:16,v:95,c:0},{x:2,y:17,v:98,c:0},{x:2,y:18,v:101,c:0},

    {x:3,y:0,v:49,c:1},{x:3,y:1,v:52,c:0},{x:3,y:2,v:55,c:0},{x:3,y:3,v:58,c:1},{x:3,y:4,v:61,c:1},
    {x:3,y:5,v:64,c:0},{x:3,y:6,v:67,c:0},{x:3,y:7,v:70,c:1},{x:3,y:8,v:73,c:1},{x:3,y:9,v:76,c:0},
    {x:3,y:10,v:79,c:0},{x:3,y:11,v:82,c:1},{x:3,y:12,v:85,c:1},{x:3,y:13,v:88,c:0},{x:3,y:14,v:91,c:0},
    {x:3,y:15,v:94,c:1},{x:3,y:16,v:97,c:1},{x:3,y:17,v:100,c:0},{x:3,y:18,v:103,c:0},

    {x:4,y:0,v:51,c:1},{x:4,y:1,v:54,c:1},{x:4,y:2,v:57,c:0},{x:4,y:3,v:60,c:0},{x:4,y:4,v:63,c:1},
    {x:4,y:5,v:66,c:1},{x:4,y:6,v:69,c:0},{x:4,y:7,v:72,c:0},{x:4,y:8,v:75,c:1},{x:4,y:9,v:78,c:1},
    {x:4,y:10,v:81,c:0},{x:4,y:11,v:84,c:0},{x:4,y:12,v:87,c:1},{x:4,y:13,v:90,c:1},{x:4,y:14,v:93,c:0},
    {x:4,y:15,v:96,c:0},{x:4,y:16,v:99,c:1},{x:4,y:17,v:102,c:1}
  ]
};

/**
 * LEFT HAND GRIFF LAYOUTS
 */

//1
export const LEFT_HAND_MIRROR_120_2_BS_ROWS_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: 6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 2.5,
  offsetXFactor: 1,
  bassesHighlighterPoints:[4, 0, 6, 0, 6, 20, 4, 20],

  keys: [
    {x:5,y:0,v:57,c:0},{x:4,y:0,v:53,c:0},{x:3,y:0,v:Chord.F,c:0},{x:2,y:0,v:Chord.Fm,c:0},{x:1,y:0,v:Chord.F7,c:0},{x:0,y:0,v:Chord.Fd,c:0},
    {x:5,y:1,v:50,c:0},{x:4,y:1,v:58,c:1},{x:3,y:1,v:Chord.AB,c:1},{x:2,y:1,v:Chord.ABm,c:1},{x:1,y:1,v:Chord.AB7,c:1},{x:0,y:1,v:Chord.ABd,c:1},
    {x:5,y:2,v:55,c:0},{x:4,y:2,v:51,c:1},{x:3,y:2,v:Chord.DE,c:1},{x:2,y:2,v:Chord.DEm,c:1},{x:1,y:2,v:Chord.DE7,c:1},{x:0,y:2,v:Chord.DEd,c:1},
    {x:5,y:3,v:48,c:0},{x:4,y:3,v:56,c:1,m:true},{x:3,y:3,v:Chord.GA,c:1},{x:2,y:3,v:Chord.GAm,c:1},{x:1,y:3,v:Chord.GA7,c:1},{x:0,y:3,v:Chord.GAd,c:1},
    {x:5,y:4,v:53,c:0},{x:4,y:4,v:49,c:1},{x:3,y:4,v:Chord.CD,c:1},{x:2,y:4,v:Chord.CDm,c:1},{x:1,y:4,v:Chord.CD7,c:1},{x:0,y:4,v:Chord.CDd,c:1},
    {x:5,y:5,v:58,c:1},{x:4,y:5,v:54,c:1},{x:3,y:5,v:Chord.FG,c:1},{x:2,y:5,v:Chord.FGm,c:1},{x:1,y:5,v:Chord.FG7,c:1},{x:0,y:5,v:Chord.FGd,c:1},
    {x:5,y:6,v:51,c:1},{x:4,y:6,v:59,c:0},{x:3,y:6,v:Chord.B,c:0},{x:2,y:6,v:Chord.Bm,c:0},{x:1,y:6,v:Chord.B7,c:0},{x:0,y:6,v:Chord.Bd,c:0},
    {x:5,y:7,v:56,c:1},{x:4,y:7,v:52,c:0,m:true},{x:3,y:7,v:Chord.E,c:0},{x:2,y:7,v:Chord.Em,c:0},{x:1,y:7,v:Chord.E7,c:0},{x:0,y:7,v:Chord.Ed,c:0},
    {x:5,y:8,v:49,c:1},{x:4,y:8,v:57,c:0},{x:3,y:8,v:Chord.A,c:0},{x:2,y:8,v:Chord.Am,c:0},{x:1,y:8,v:Chord.A7,c:0},{x:0,y:8,v:Chord.Ad,c:0},
    {x:5,y:9,v:54,c:1},{x:4,y:9,v:50,c:0},{x:3,y:9,v:Chord.D,c:0},{x:2,y:9,v:Chord.Dm,c:0},{x:1,y:9,v:Chord.D7,c:0},{x:0,y:9,v:Chord.Dd,c:0},
    {x:5,y:10,v:59,c:0},{x:4,y:10,v:55,c:0},{x:3,y:10,v:Chord.G,c:0},{x:2,y:10,v:Chord.Gm,c:0},{x:1,y:10,v:Chord.G7,c:0},{x:0,y:10,v:Chord.Gd,c:0},
    {x:5,y:11,v:52,c:0},{x:4,y:11,v:48,c:0,m:true},{x:3,y:11,v:Chord.C,c:0},{x:2,y:11,v:Chord.Cm,c:0},{x:1,y:11,v:Chord.C7,c:0},{x:0,y:11,v:Chord.Cd,c:0},
    {x:5,y:12,v:57,c:0},{x:4,y:12,v:53,c:0},{x:3,y:12,v:Chord.F,c:0},{x:2,y:12,v:Chord.Fm,c:0},{x:1,y:12,v:Chord.F7,c:0},{x:0,y:12,v:Chord.Fd,c:0},
    {x:5,y:13,v:50,c:0},{x:4,y:13,v:58,c:1},{x:3,y:13,v:Chord.AB,c:1},{x:2,y:13,v:Chord.ABm,c:1},{x:1,y:13,v:Chord.AB7,c:1},{x:0,y:13,v:Chord.ABd,c:1},
    {x:5,y:14,v:55,c:0},{x:4,y:14,v:51,c:1},{x:3,y:14,v:Chord.DE,c:1},{x:2,y:14,v:Chord.DEm,c:1},{x:1,y:14,v:Chord.DE7,c:1},{x:0,y:14,v:Chord.DEd,c:1},
    {x:5,y:15,v:48,c:0},{x:4,y:15,v:56,c:1,m:true},{x:3,y:15,v:Chord.GA,c:1},{x:2,y:15,v:Chord.GAm,c:1},{x:1,y:15,v:Chord.GA7,c:1},{x:0,y:15,v:Chord.GAd,c:1},
    {x:5,y:16,v:53,c:0},{x:4,y:16,v:49,c:1},{x:3,y:16,v:Chord.CD,c:1},{x:2,y:16,v:Chord.CDm,c:1},{x:1,y:16,v:Chord.CD7,c:1},{x:0,y:16,v:Chord.CDd,c:1},
    {x:5,y:17,v:58,c:1},{x:4,y:17,v:54,c:1},{x:3,y:17,v:Chord.FG,c:1},{x:2,y:17,v:Chord.FGm,c:1},{x:1,y:17,v:Chord.FG7,c:1},{x:0,y:17,v:Chord.FGd,c:1},
    {x:5,y:18,v:51,c:1},{x:4,y:18,v:59,c:0},{x:3,y:18,v:Chord.B,c:0},{x:2,y:18,v:Chord.Bm,c:0},{x:1,y:18,v:Chord.B7,c:0},{x:0,y:18,v:Chord.Bd,c:0},
    {x:5,y:19,v:56,c:1},{x:4,y:19,v:52,c:0,m:true},{x:3,y:19,v:Chord.E,c:0},{x:2,y:19,v:Chord.Em,c:0},{x:1,y:19,v:Chord.E7,c:0},{x:0,y:19,v:Chord.Ed,c:0},
]
};

export const LEFT_HAND_TEACHER_120_2_BS_ROWS_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: -6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 4,
  offsetXFactor: 1,
  bassesHighlighterPoints:[0, 0, 2, 0, 2, 20, 0, 20],

  keys: [
    {x:0,y:0,v:57,c:0},{x:1,y:0,v:53,c:0},{x:2,y:0,v:Chord.F,c:0},{x:3,y:0,v:Chord.Fm,c:0},{x:4,y:0,v:Chord.F7,c:0},{x:5,y:0,v:Chord.Fd,c:0},
    {x:0,y:1,v:50,c:0},{x:1,y:1,v:58,c:1},{x:2,y:1,v:Chord.AB,c:1},{x:3,y:1,v:Chord.ABm,c:1},{x:4,y:1,v:Chord.AB7,c:1},{x:5,y:1,v:Chord.ABd,c:1},
    {x:0,y:2,v:55,c:0},{x:1,y:2,v:51,c:1},{x:2,y:2,v:Chord.DE,c:1},{x:3,y:2,v:Chord.DEm,c:1},{x:4,y:2,v:Chord.DE7,c:1},{x:5,y:2,v:Chord.DEd,c:1},
    {x:0,y:3,v:48,c:0},{x:1,y:3,v:56,c:1,m:true},{x:2,y:3,v:Chord.GA,c:1},{x:3,y:3,v:Chord.GAm,c:1},{x:4,y:3,v:Chord.GA7,c:1},{x:5,y:3,v:Chord.GAd,c:1},
    {x:0,y:4,v:53,c:0},{x:1,y:4,v:49,c:1},{x:2,y:4,v:Chord.CD,c:1},{x:3,y:4,v:Chord.CDm,c:1},{x:4,y:4,v:Chord.CD7,c:1},{x:5,y:4,v:Chord.CDd,c:1},
    {x:0,y:5,v:58,c:1},{x:1,y:5,v:54,c:1},{x:2,y:5,v:Chord.FG,c:1},{x:3,y:5,v:Chord.FGm,c:1},{x:4,y:5,v:Chord.FG7,c:1},{x:5,y:5,v:Chord.FGd,c:1},
    {x:0,y:6,v:51,c:1},{x:1,y:6,v:59,c:0},{x:2,y:6,v:Chord.B,c:0},{x:3,y:6,v:Chord.Bm,c:0},{x:4,y:6,v:Chord.B7,c:0},{x:5,y:6,v:Chord.Bd,c:0},
    {x:0,y:7,v:56,c:1},{x:1,y:7,v:52,c:0,m:true},{x:2,y:7,v:Chord.E,c:0},{x:3,y:7,v:Chord.Em,c:0},{x:4,y:7,v:Chord.E7,c:0},{x:5,y:7,v:Chord.Ed,c:0},
    {x:0,y:8,v:49,c:1},{x:1,y:8,v:57,c:0},{x:2,y:8,v:Chord.A,c:0},{x:3,y:8,v:Chord.Am,c:0},{x:4,y:8,v:Chord.A7,c:0},{x:5,y:8,v:Chord.Ad,c:0},
    {x:0,y:9,v:54,c:1},{x:1,y:9,v:50,c:0},{x:2,y:9,v:Chord.D,c:0},{x:3,y:9,v:Chord.Dm,c:0},{x:4,y:9,v:Chord.D7,c:0},{x:5,y:9,v:Chord.Dd,c:0},
    {x:0,y:10,v:59,c:0},{x:1,y:10,v:55,c:0},{x:2,y:10,v:Chord.G,c:0},{x:3,y:10,v:Chord.Gm,c:0},{x:4,y:10,v:Chord.G7,c:0},{x:5,y:10,v:Chord.Gd,c:0},
    {x:0,y:11,v:52,c:0},{x:1,y:11,v:48,c:0,m:true},{x:2,y:11,v:Chord.C,c:0},{x:3,y:11,v:Chord.Cm,c:0},{x:4,y:11,v:Chord.C7,c:0},{x:5,y:11,v:Chord.Cd,c:0},
    {x:0,y:12,v:57,c:0},{x:1,y:12,v:53,c:0},{x:2,y:12,v:Chord.F,c:0},{x:3,y:12,v:Chord.Fm,c:0},{x:4,y:12,v:Chord.F7,c:0},{x:5,y:12,v:Chord.Fd,c:0},
    {x:0,y:13,v:50,c:0},{x:1,y:13,v:58,c:1},{x:2,y:13,v:Chord.AB,c:1},{x:3,y:13,v:Chord.ABm,c:1},{x:4,y:13,v:Chord.AB7,c:1},{x:5,y:13,v:Chord.ABd,c:1},
    {x:0,y:14,v:55,c:0},{x:1,y:14,v:51,c:1},{x:2,y:14,v:Chord.DE,c:1},{x:3,y:14,v:Chord.DEm,c:1},{x:4,y:14,v:Chord.DE7,c:1},{x:5,y:14,v:Chord.DEd,c:1},
    {x:0,y:15,v:48,c:0},{x:1,y:15,v:56,c:1,m:true},{x:2,y:15,v:Chord.GA,c:1},{x:3,y:15,v:Chord.GAm,c:1},{x:4,y:15,v:Chord.GA7,c:1},{x:5,y:15,v:Chord.GAd,c:1},
    {x:0,y:16,v:53,c:0},{x:1,y:16,v:49,c:1},{x:2,y:16,v:Chord.CD,c:1},{x:3,y:16,v:Chord.CDm,c:1},{x:4,y:16,v:Chord.CD7,c:1},{x:5,y:16,v:Chord.CDd,c:1},
    {x:0,y:17,v:58,c:1},{x:1,y:17,v:54,c:1},{x:2,y:17,v:Chord.FG,c:1},{x:3,y:17,v:Chord.FGm,c:1},{x:4,y:17,v:Chord.FG7,c:1},{x:5,y:17,v:Chord.FGd,c:1},
    {x:0,y:18,v:51,c:1},{x:1,y:18,v:59,c:0},{x:2,y:18,v:Chord.B,c:0},{x:3,y:18,v:Chord.Bm,c:0},{x:4,y:18,v:Chord.B7,c:0},{x:5,y:18,v:Chord.Bd,c:0},
    {x:0,y:19,v:56,c:1},{x:1,y:19,v:52,c:0,m:true},{x:2,y:19,v:Chord.E,c:0},{x:3,y:19,v:Chord.Em,c:0},{x:4,y:19,v:Chord.E7,c:0},{x:5,y:19,v:Chord.Ed,c:0},
  ]
};

//2,3
export const LEFT_HAND_MIRROR_120_3_BS_ROWS_A_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: 6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 2.5,
  offsetXFactor: 1,
  bassesHighlighterPoints: [3, 0, 6, 0, 6, 20, 3, 20],

  keys: [
    {x:5,y:0,v:49,c:1},{x:4,y:0,v:57,c:0},{x:3,y:0,v:53,c:0},{x:2,y:0,v:Chord.F,c:0},{x:1,y:0,v:Chord.Fm,c:0},{x:0,y:0,v:Chord.F7,c:0},
    {x:5,y:1,v:54,c:1},{x:4,y:1,v:50,c:0},{x:3,y:1,v:58,c:1},{x:2,y:1,v:Chord.AB,c:1},{x:1,y:1,v:Chord.ABm,c:1},{x:0,y:1,v:Chord.AB7,c:1},
    {x:5,y:2,v:59,c:0},{x:4,y:2,v:55,c:0},{x:3,y:2,v:51,c:1},{x:2,y:2,v:Chord.DE,c:1},{x:1,y:2,v:Chord.DEm,c:1},{x:0,y:2,v:Chord.DE7,c:1},
    {x:5,y:3,v:52,c:0},{x:4,y:3,v:48,c:0},{x:3,y:3,v:56,c:1},{x:2,y:3,v:Chord.GA,c:1},{x:1,y:3,v:Chord.GAm,c:1},{x:0,y:3,v:Chord.GA7,c:1},
    {x:5,y:4,v:57,c:0},{x:4,y:4,v:53,c:0},{x:3,y:4,v:49,c:1},{x:2,y:4,v:Chord.CD,c:1},{x:1,y:4,v:Chord.CDm,c:1},{x:0,y:4,v:Chord.CD7,c:1},
    {x:5,y:5,v:50,c:0},{x:4,y:5,v:58,c:1},{x:3,y:5,v:54,c:1},{x:2,y:5,v:Chord.FG,c:1},{x:1,y:5,v:Chord.FGm,c:1},{x:0,y:5,v:Chord.FG7,c:1},
    {x:5,y:6,v:55,c:0},{x:4,y:6,v:51,c:1},{x:3,y:6,v:59,c:0},{x:2,y:6,v:Chord.B,c:0},{x:1,y:6,v:Chord.Bm,c:0},{x:0,y:6,v:Chord.B7,c:0},
    {x:5,y:7,v:48,c:0},{x:4,y:7,v:56,c:1},{x:3,y:7,v:52,c:0},{x:2,y:7,v:Chord.E,c:0},{x:1,y:7,v:Chord.Em,c:0},{x:0,y:7,v:Chord.E7,c:0},
    {x:5,y:8,v:53,c:0},{x:4,y:8,v:49,c:1},{x:3,y:8,v:57,c:0},{x:2,y:8,v:Chord.A,c:0},{x:1,y:8,v:Chord.Am,c:0},{x:0,y:8,v:Chord.A7,c:0},
    {x:5,y:9,v:58,c:1},{x:4,y:9,v:54,c:1},{x:3,y:9,v:50,c:0},{x:2,y:9,v:Chord.D,c:0},{x:1,y:9,v:Chord.Dm,c:0},{x:0,y:9,v:Chord.D7,c:0},
    {x:5,y:10,v:51,c:1},{x:4,y:10,v:59,c:0},{x:3,y:10,v:55,c:0},{x:2,y:10,v:Chord.G,c:0},{x:1,y:10,v:Chord.Gm,c:0},{x:0,y:10,v:Chord.G7,c:0},
    {x:5,y:11,v:56,c:1},{x:4,y:11,v:52,c:0},{x:3,y:11,v:48,c:0},{x:2,y:11,v:Chord.C,c:0},{x:1,y:11,v:Chord.Cm,c:0},{x:0,y:11,v:Chord.C7,c:0},
    {x:5,y:12,v:49,c:1},{x:4,y:12,v:57,c:0},{x:3,y:12,v:53,c:0},{x:2,y:12,v:Chord.F,c:0},{x:1,y:12,v:Chord.Fm,c:0},{x:0,y:12,v:Chord.F7,c:0},
    {x:5,y:13,v:54,c:1},{x:4,y:13,v:50,c:0},{x:3,y:13,v:58,c:1},{x:2,y:13,v:Chord.AB,c:1},{x:1,y:13,v:Chord.ABm,c:1},{x:0,y:13,v:Chord.AB7,c:1},
    {x:5,y:14,v:59,c:0},{x:4,y:14,v:55,c:0},{x:3,y:14,v:51,c:1},{x:2,y:14,v:Chord.DE,c:1},{x:1,y:14,v:Chord.DEm,c:1},{x:0,y:14,v:Chord.DE7,c:1},
    {x:5,y:15,v:52,c:0},{x:4,y:15,v:48,c:0},{x:3,y:15,v:56,c:1},{x:2,y:15,v:Chord.GA,c:1},{x:1,y:15,v:Chord.GAm,c:1},{x:0,y:15,v:Chord.GA7,c:1},
    {x:5,y:16,v:57,c:0},{x:4,y:16,v:53,c:0},{x:3,y:16,v:49,c:1},{x:2,y:16,v:Chord.CD,c:1},{x:1,y:16,v:Chord.CDm,c:1},{x:0,y:16,v:Chord.CD7,c:1},
    {x:5,y:17,v:50,c:0},{x:4,y:17,v:58,c:1},{x:3,y:17,v:54,c:1},{x:2,y:17,v:Chord.FG,c:1},{x:1,y:17,v:Chord.FGm,c:1},{x:0,y:17,v:Chord.FG7,c:1},
    {x:5,y:18,v:55,c:0},{x:4,y:18,v:51,c:1},{x:3,y:18,v:59,c:0},{x:2,y:18,v:Chord.B,c:0},{x:1,y:18,v:Chord.Bm,c:0},{x:0,y:18,v:Chord.B7,c:0},
    {x:5,y:19,v:48,c:0},{x:4,y:19,v:56,c:1},{x:3,y:19,v:52,c:0},{x:2,y:19,v:Chord.E,c:0},{x:1,y:19,v:Chord.Em,c:0},{x:0,y:19,v:Chord.E7,c:0},

  ]
};

export const LEFT_HAND_TEACHER_120_3_BS_ROWS_A_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: -6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 4,
  offsetXFactor: 1,
  bassesHighlighterPoints:[0, 0, 3, 0, 3, 20, 0, 20],

  keys: [
    {x:0,y:0,v:49,c:1},{x:1,y:0,v:57,c:0},{x:2,y:0,v:53,c:0},{x:3,y:0,v:Chord.F,c:0},{x:4,y:0,v:Chord.Fm,c:0},
    {x:5,y:0,v:Chord.F7,c:0},{x:0,y:1,v:54,c:1},{x:1,y:1,v:50,c:0},{x:2,y:1,v:58,c:1},{x:3,y:1,v:Chord.AB,c:1},
    {x:4,y:1,v:Chord.ABm,c:1},{x:5,y:1,v:Chord.AB7,c:1},{x:0,y:2,v:59,c:0},{x:1,y:2,v:55,c:0},{x:2,y:2,v:51,c:1},
    {x:3,y:2,v:Chord.DE,c:1},{x:4,y:2,v:Chord.DEm,c:1},{x:5,y:2,v:Chord.DE7,c:1},{x:0,y:3,v:52,c:0},{x:1,y:3,v:48,c:0},
    {x:2,y:3,v:56,c:1},{x:3,y:3,v:Chord.GA,c:1},{x:4,y:3,v:Chord.GAm,c:1},{x:5,y:3,v:Chord.GA7,c:1},{x:0,y:4,v:57,c:0},
    {x:1,y:4,v:53,c:0},{x:2,y:4,v:49,c:1},{x:3,y:4,v:Chord.CD,c:1},{x:4,y:4,v:Chord.CDm,c:1},{x:5,y:4,v:Chord.CD7,c:1},
    {x:0,y:5,v:50,c:0},{x:1,y:5,v:58,c:1},{x:2,y:5,v:54,c:1},{x:3,y:5,v:Chord.FG,c:1},{x:4,y:5,v:Chord.FGm,c:1},
    {x:5,y:5,v:Chord.FG7,c:1},{x:0,y:6,v:55,c:0},{x:1,y:6,v:51,c:1},{x:2,y:6,v:59,c:0},{x:3,y:6,v:Chord.B,c:0},
    {x:4,y:6,v:Chord.Bm,c:0},{x:5,y:6,v:Chord.B7,c:0},{x:0,y:7,v:48,c:0},{x:1,y:7,v:56,c:1},{x:2,y:7,v:52,c:0},
    {x:3,y:7,v:Chord.E,c:0},{x:4,y:7,v:Chord.Em,c:0},{x:5,y:7,v:Chord.E7,c:0},{x:0,y:8,v:53,c:0},{x:1,y:8,v:49,c:1},
    {x:2,y:8,v:57,c:0},{x:3,y:8,v:Chord.A,c:0},{x:4,y:8,v:Chord.Am,c:0},{x:5,y:8,v:Chord.A7,c:0},{x:0,y:9,v:58,c:1},
    {x:1,y:9,v:54,c:1},{x:2,y:9,v:50,c:0},{x:3,y:9,v:Chord.D,c:0},{x:4,y:9,v:Chord.Dm,c:0},{x:5,y:9,v:Chord.D7,c:0},
    {x:0,y:10,v:51,c:1},{x:1,y:10,v:59,c:0},{x:2,y:10,v:55,c:0},{x:3,y:10,v:Chord.G,c:0},{x:4,y:10,v:Chord.Gm,c:0},
    {x:5,y:10,v:Chord.G7,c:0},{x:0,y:11,v:56,c:1},{x:1,y:11,v:52,c:0},{x:2,y:11,v:48,c:0},{x:3,y:11,v:Chord.C,c:0},
    {x:4,y:11,v:Chord.Cm,c:0},{x:5,y:11,v:Chord.C7,c:0},{x:0,y:12,v:49,c:1},{x:1,y:12,v:57,c:0},{x:2,y:12,v:53,c:0},
    {x:3,y:12,v:Chord.F,c:0},{x:4,y:12,v:Chord.Fm,c:0},{x:5,y:12,v:Chord.F7,c:0},{x:0,y:13,v:54,c:1},{x:1,y:13,v:50,c:0},
    {x:2,y:13,v:58,c:1},{x:3,y:13,v:Chord.AB,c:1},{x:4,y:13,v:Chord.ABm,c:1},{x:5,y:13,v:Chord.AB7,c:1},{x:0,y:14,v:59,c:0},
    {x:1,y:14,v:55,c:0},{x:2,y:14,v:51,c:1},{x:3,y:14,v:Chord.DE,c:1},{x:4,y:14,v:Chord.DEm,c:1},{x:5,y:14,v:Chord.DE7,c:1},
    {x:0,y:15,v:52,c:0},{x:1,y:15,v:48,c:0},{x:2,y:15,v:56,c:1},{x:3,y:15,v:Chord.GA,c:1},{x:4,y:15,v:Chord.GAm,c:1},
    {x:5,y:15,v:Chord.GA7,c:1},{x:0,y:16,v:57,c:0},{x:1,y:16,v:53,c:0},{x:2,y:16,v:49,c:1},{x:3,y:16,v:Chord.CD,c:1},
    {x:4,y:16,v:Chord.CDm,c:1},{x:5,y:16,v:Chord.CD7,c:1},{x:0,y:17,v:50,c:0},{x:1,y:17,v:58,c:1},{x:2,y:17,v:54,c:1},
    {x:3,y:17,v:Chord.FG,c:1},{x:4,y:17,v:Chord.FGm,c:1},{x:5,y:17,v:Chord.FG7,c:1},{x:0,y:18,v:55,c:0},{x:1,y:18,v:51,c:1},
    {x:2,y:18,v:59,c:0},{x:3,y:18,v:Chord.B,c:0},{x:4,y:18,v:Chord.Bm,c:0},{x:5,y:18,v:Chord.B7,c:0},{x:0,y:19,v:48,c:0},
    {x:1,y:19,v:56,c:1},{x:2,y:19,v:52,c:0},{x:3,y:19,v:Chord.E,c:0},{x:4,y:19,v:Chord.Em,c:0},{x:5,y:19,v:Chord.E7,c:0}
  ]
};

//4,5
export const LEFT_HAND_MIRROR_120_3_BS_ROWS_B_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: 6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 2.5,
  offsetXFactor: 1,
  bassesHighlighterPoints: [3, 0, 6, 0, 6, 20, 3, 20],

  keys: [
    {x:5,y:0,v:Bass.GA,c:1},{x:4,y:0,v:Bass.A,c:0},{x:3,y:0,v:Bass.F,c:0},{x:2,y:0,v:Chord.F,c:0},{x:1,y:0,v:Chord.Fm,c:0},{x:0,y:0,v:Chord.F7,c:0},
    {x:5,y:1,v:Bass.CD,c:1},{x:4,y:1,v:Bass.D,c:0},{x:3,y:1,v:Bass.AB,c:1},{x:2,y:1,v:Chord.AB,c:1},{x:1,y:1,v:Chord.ABm,c:1},{x:0,y:1,v:Chord.AB7,c:1},
    {x:5,y:2,v:Bass.FG,c:1},{x:4,y:2,v:Bass.G,c:0},{x:3,y:2,v:Bass.DE,c:1},{x:2,y:2,v:Chord.DE,c:1},{x:1,y:2,v:Chord.DEm,c:1},{x:0,y:2,v:Chord.DE7,c:1},
    {x:5,y:3,v:Bass.B,c:0},{x:4,y:3,v:Bass.C,c:0},{x:3,y:3,v:Bass.GA,c:1},{x:2,y:3,v:Chord.GA,c:1},{x:1,y:3,v:Chord.GAm,c:1},{x:0,y:3,v:Chord.GA7,c:1},
    {x:5,y:4,v:Bass.E,c:0},{x:4,y:4,v:Bass.F,c:0},{x:3,y:4,v:Bass.CD,c:1},{x:2,y:4,v:Chord.CD,c:1},{x:1,y:4,v:Chord.CDm,c:1},{x:0,y:4,v:Chord.CD7,c:1},
    {x:5,y:5,v:Bass.A,c:0},{x:4,y:5,v:Bass.AB,c:1},{x:3,y:5,v:Bass.FG,c:1},{x:2,y:5,v:Chord.FG,c:1},{x:1,y:5,v:Chord.FGm,c:1},{x:0,y:5,v:Chord.FG7,c:1},
    {x:5,y:6,v:Bass.D,c:0},{x:4,y:6,v:Bass.DE,c:1},{x:3,y:6,v:Bass.B,c:0},{x:2,y:6,v:Chord.B,c:0},{x:1,y:6,v:Chord.Bm,c:0},{x:0,y:6,v:Chord.B7,c:0},
    {x:5,y:7,v:Bass.G,c:0},{x:4,y:7,v:Bass.GA,c:1},{x:3,y:7,v:Bass.E,c:0},{x:2,y:7,v:Chord.E,c:0},{x:1,y:7,v:Chord.Em,c:0},{x:0,y:7,v:Chord.E7,c:0},
    {x:5,y:8,v:Bass.C,c:0},{x:4,y:8,v:Bass.CD,c:1},{x:3,y:8,v:Bass.A,c:0},{x:2,y:8,v:Chord.A,c:0},{x:1,y:8,v:Chord.Am,c:0},{x:0,y:8,v:Chord.A7,c:0},
    {x:5,y:9,v:Bass.F,c:0},{x:4,y:9,v:Bass.FG,c:1},{x:3,y:9,v:Bass.D,c:0},{x:2,y:9,v:Chord.D,c:0},{x:1,y:9,v:Chord.Dm,c:0},{x:0,y:9,v:Chord.D7,c:0},
    {x:5,y:10,v:Bass.AB,c:1},{x:4,y:10,v:Bass.B,c:0},{x:3,y:10,v:Bass.G,c:0},{x:2,y:10,v:Chord.G,c:0},{x:1,y:10,v:Chord.Gm,c:0},{x:0,y:10,v:Chord.G7,c:0},
    {x:5,y:11,v:Bass.DE,c:1},{x:4,y:11,v:Bass.E,c:0},{x:3,y:11,v:Bass.C,c:0},{x:2,y:11,v:Chord.C,c:0},{x:1,y:11,v:Chord.Cm,c:0},{x:0,y:11,v:Chord.C7,c:0},
    {x:5,y:12,v:Bass.GA,c:1},{x:4,y:12,v:Bass.A,c:0},{x:3,y:12,v:Bass.F,c:0},{x:2,y:12,v:Chord.F,c:0},{x:1,y:12,v:Chord.Fm,c:0},{x:0,y:12,v:Chord.F7,c:0},
    {x:5,y:13,v:Bass.CD,c:1},{x:4,y:13,v:Bass.D,c:0},{x:3,y:13,v:Bass.AB,c:1},{x:2,y:13,v:Chord.AB,c:1},{x:1,y:13,v:Chord.ABm,c:1},{x:0,y:13,v:Chord.AB7,c:1},
    {x:5,y:14,v:Bass.FG,c:1},{x:4,y:14,v:Bass.G,c:0},{x:3,y:14,v:Bass.DE,c:1},{x:2,y:14,v:Chord.DE,c:1},{x:1,y:14,v:Chord.DEm,c:1},{x:0,y:14,v:Chord.DE7,c:1},
    {x:5,y:15,v:Bass.B,c:0},{x:4,y:15,v:Bass.C,c:0},{x:3,y:15,v:Bass.GA,c:1},{x:2,y:15,v:Chord.GA,c:1},{x:1,y:15,v:Chord.GAm,c:1},{x:0,y:15,v:Chord.GA7,c:1},
    {x:5,y:16,v:Bass.E,c:0},{x:4,y:16,v:Bass.F,c:0},{x:3,y:16,v:Bass.CD,c:1},{x:2,y:16,v:Chord.CD,c:1},{x:1,y:16,v:Chord.CDm,c:1},{x:0,y:16,v:Chord.CD7,c:1},
    {x:5,y:17,v:Bass.A,c:0},{x:4,y:17,v:Bass.AB,c:1},{x:3,y:17,v:Bass.FG,c:1},{x:2,y:17,v:Chord.FG,c:1},{x:1,y:17,v:Chord.FGm,c:1},{x:0,y:17,v:Chord.FG7,c:1},
    {x:5,y:18,v:Bass.D,c:0},{x:4,y:18,v:Bass.DE,c:1},{x:3,y:18,v:Bass.B,c:0},{x:2,y:18,v:Chord.B,c:0},{x:1,y:18,v:Chord.Bm,c:0},{x:0,y:18,v:Chord.B7,c:0},
    {x:5,y:19,v:Bass.G,c:0},{x:4,y:19,v:Bass.GA,c:1},{x:3,y:19,v:Bass.E,c:0},{x:2,y:19,v:Chord.E,c:0},{x:1,y:19,v:Chord.Em,c:0},{x:0,y:19,v:Chord.E7,c:0},

  ]
};

export const LEFT_HAND_TEACHER_120_3_BS_ROWS_B_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: -6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 4,
  offsetXFactor: 1,
  bassesHighlighterPoints:[0, 0, 3, 0, 3, 20, 0, 20],

  keys: [
    {x:0,y:0,v:Bass.GA,c:1},{x:1,y:0,v:Bass.A,c:0},{x:2,y:0,v:Bass.F,c:0},{x:3,y:0,v:Chord.F,c:0},{x:4,y:0,v:Chord.Fm,c:0},
    {x:5,y:0,v:Chord.F7,c:0},{x:0,y:1,v:Bass.CD,c:1},{x:1,y:1,v:Bass.D,c:0},{x:2,y:1,v:Bass.AB,c:1},{x:3,y:1,v:Chord.AB,c:1},
    {x:4,y:1,v:Chord.ABm,c:1},{x:5,y:1,v:Chord.AB7,c:1},{x:0,y:2,v:Bass.FG,c:1},{x:1,y:2,v:Bass.G,c:0},{x:2,y:2,v:Bass.DE,c:1},
    {x:3,y:2,v:Chord.DE,c:1},{x:4,y:2,v:Chord.DEm,c:1},{x:5,y:2,v:Chord.DE7,c:1},{x:0,y:3,v:Bass.B,c:0},{x:1,y:3,v:Bass.C,c:0},
    {x:2,y:3,v:Bass.GA,c:1},{x:3,y:3,v:Chord.GA,c:1},{x:4,y:3,v:Chord.GAm,c:1},{x:5,y:3,v:Chord.GA7,c:1},{x:0,y:4,v:Bass.E,c:0},
    {x:1,y:4,v:Bass.F,c:0},{x:2,y:4,v:Bass.CD,c:1},{x:3,y:4,v:Chord.CD,c:1},{x:4,y:4,v:Chord.CDm,c:1},{x:5,y:4,v:Chord.CD7,c:1},
    {x:0,y:5,v:Bass.A,c:0},{x:1,y:5,v:Bass.AB,c:1},{x:2,y:5,v:Bass.FG,c:1},{x:3,y:5,v:Chord.FG,c:1},{x:4,y:5,v:Chord.FGm,c:1},
    {x:5,y:5,v:Chord.FG7,c:1},{x:0,y:6,v:Bass.D,c:0},{x:1,y:6,v:Bass.DE,c:1},{x:2,y:6,v:Bass.B,c:0},{x:3,y:6,v:Chord.B,c:0},
    {x:4,y:6,v:Chord.Bm,c:0},{x:5,y:6,v:Chord.B7,c:0},{x:0,y:7,v:Bass.G,c:0},{x:1,y:7,v:Bass.GA,c:1},{x:2,y:7,v:Bass.E,c:0},
    {x:3,y:7,v:Chord.E,c:0},{x:4,y:7,v:Chord.Em,c:0},{x:5,y:7,v:Chord.E7,c:0},{x:0,y:8,v:Bass.C,c:0},{x:1,y:8,v:Bass.CD,c:1},
    {x:2,y:8,v:Bass.A,c:0},{x:3,y:8,v:Chord.A,c:0},{x:4,y:8,v:Chord.Am,c:0},{x:5,y:8,v:Chord.A7,c:0},{x:0,y:9,v:Bass.F,c:0},
    {x:1,y:9,v:Bass.FG,c:1},{x:2,y:9,v:Bass.D,c:0},{x:3,y:9,v:Chord.D,c:0},{x:4,y:9,v:Chord.Dm,c:0},{x:5,y:9,v:Chord.D7,c:0},
    {x:0,y:10,v:Bass.AB,c:1},{x:1,y:10,v:Bass.B,c:0},{x:2,y:10,v:Bass.G,c:0},{x:3,y:10,v:Chord.G,c:0},{x:4,y:10,v:Chord.Gm,c:0},
    {x:5,y:10,v:Chord.G7,c:0},{x:0,y:11,v:Bass.DE,c:1},{x:1,y:11,v:Bass.E,c:0},{x:2,y:11,v:Bass.C,c:0},{x:3,y:11,v:Chord.C,c:0},
    {x:4,y:11,v:Chord.Cm,c:0},{x:5,y:11,v:Chord.C7,c:0},{x:0,y:12,v:Bass.GA,c:1},{x:1,y:12,v:Bass.A,c:0},{x:2,y:12,v:Bass.F,c:0},
    {x:3,y:12,v:Chord.F,c:0},{x:4,y:12,v:Chord.Fm,c:0},{x:5,y:12,v:Chord.F7,c:0},{x:0,y:13,v:Bass.CD,c:1},{x:1,y:13,v:Bass.D,c:0},
    {x:2,y:13,v:Bass.AB,c:1},{x:3,y:13,v:Chord.AB,c:1},{x:4,y:13,v:Chord.ABm,c:1},{x:5,y:13,v:Chord.AB7,c:1},{x:0,y:14,v:Bass.FG,c:1},
    {x:1,y:14,v:Bass.G,c:0},{x:2,y:14,v:Bass.DE,c:1},{x:3,y:14,v:Chord.DE,c:1},{x:4,y:14,v:Chord.DEm,c:1},{x:5,y:14,v:Chord.DE7,c:1},
    {x:0,y:15,v:Bass.B,c:0},{x:1,y:15,v:Bass.C,c:0},{x:2,y:15,v:Bass.GA,c:1},{x:3,y:15,v:Chord.GA,c:1},{x:4,y:15,v:Chord.GAm,c:1},
    {x:5,y:15,v:Chord.GA7,c:1},{x:0,y:16,v:Bass.E,c:0},{x:1,y:16,v:Bass.F,c:0},{x:2,y:16,v:Bass.CD,c:1},{x:3,y:16,v:Chord.CD,c:1},
    {x:4,y:16,v:Chord.CDm,c:1},{x:5,y:16,v:Chord.CD7,c:1},{x:0,y:17,v:Bass.A,c:0},{x:1,y:17,v:Bass.AB,c:1},{x:2,y:17,v:Bass.FG,c:1},
    {x:3,y:17,v:Chord.FG,c:1},{x:4,y:17,v:Chord.FGm,c:1},{x:5,y:17,v:Chord.FG7,c:1},{x:0,y:18,v:Bass.D,c:0},{x:1,y:18,v:Bass.DE,c:1},
    {x:2,y:18,v:Bass.B,c:0},{x:3,y:18,v:Chord.B,c:0},{x:4,y:18,v:Chord.Bm,c:0},{x:5,y:18,v:Chord.B7,c:0},{x:0,y:19,v:Bass.G,c:0},
    {x:1,y:19,v:Bass.GA,c:1},{x:2,y:19,v:Bass.E,c:0},{x:3,y:19,v:Chord.E,c:0},{x:4,y:19,v:Chord.Em,c:0},{x:5,y:19,v:Chord.E7,c:0}
  ]
};

//6
export const LEFT_HAND_MIRROR_120_3_BS_ROWS_BX_A_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: 6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 2.5,
  offsetXFactor: 1,
  bassesHighlighterPoints: [3, 0, 6, 0, 6, 20, 3, 20],

  keys: [
    {x:5,y:0,v:Bass.G,c:0},{x:4,y:0,v:Bass.GA,c:1},{x:3,y:0,v:Bass.E,c:0},{x:2,y:0,v:Chord.E,c:0},{x:1,y:0,v:Chord.Em,c:0},{x:0,y:0,v:Chord.E7,c:0},
    {x:5,y:1,v:Bass.D,c:0},{x:4,y:1,v:Bass.DE,c:1},{x:3,y:1,v:Bass.B,c:0},{x:2,y:1,v:Chord.B,c:0},{x:1,y:1,v:Chord.Bm,c:0},{x:0,y:1,v:Chord.B7,c:0},
    {x:5,y:2,v:Bass.A,c:0},{x:4,y:2,v:Bass.AB,c:1},{x:3,y:2,v:Bass.FG,c:1},{x:2,y:2,v:Chord.FG,c:1},{x:1,y:2,v:Chord.FGm,c:1},{x:0,y:2,v:Chord.FG7,c:1},
    {x:5,y:3,v:Bass.E,c:0},{x:4,y:3,v:Bass.F,c:0},{x:3,y:3,v:Bass.CD,c:1},{x:2,y:3,v:Chord.CD,c:1},{x:1,y:3,v:Chord.CDm,c:1},{x:0,y:3,v:Chord.CD7,c:1},
    {x:5,y:4,v:Bass.B,c:0},{x:4,y:4,v:Bass.C,c:0},{x:3,y:4,v:Bass.GA,c:1},{x:2,y:4,v:Chord.GA,c:1},{x:1,y:4,v:Chord.GAm,c:1},{x:0,y:4,v:Chord.GA7,c:1},
    {x:5,y:5,v:Bass.FG,c:1},{x:4,y:5,v:Bass.G,c:0},{x:3,y:5,v:Bass.DE,c:1},{x:2,y:5,v:Chord.DE,c:1},{x:1,y:5,v:Chord.DEm,c:1},{x:0,y:5,v:Chord.DE7,c:1},
    {x:5,y:6,v:Bass.CD,c:1},{x:4,y:6,v:Bass.D,c:0},{x:3,y:6,v:Bass.AB,c:1},{x:2,y:6,v:Chord.AB,c:1},{x:1,y:6,v:Chord.ABm,c:1},{x:0,y:6,v:Chord.AB7,c:1},
    {x:5,y:7,v:Bass.GA,c:1},{x:4,y:7,v:Bass.A,c:0},{x:3,y:7,v:Bass.F,c:0},{x:2,y:7,v:Chord.F,c:0},{x:1,y:7,v:Chord.Fm,c:0},{x:0,y:7,v:Chord.F7,c:0},
    {x:5,y:8,v:Bass.DE,c:1},{x:4,y:8,v:Bass.E,c:0},{x:3,y:8,v:Bass.C,c:0},{x:2,y:8,v:Chord.C,c:0},{x:1,y:8,v:Chord.Cm,c:0},{x:0,y:8,v:Chord.C7,c:0},
    {x:5,y:9,v:Bass.AB,c:1},{x:4,y:9,v:Bass.B,c:0},{x:3,y:9,v:Bass.G,c:0},{x:2,y:9,v:Chord.G,c:0},{x:1,y:9,v:Chord.Gm,c:0},{x:0,y:9,v:Chord.G7,c:0},
    {x:5,y:10,v:Bass.F,c:0},{x:4,y:10,v:Bass.FG,c:1},{x:3,y:10,v:Bass.D,c:0},{x:2,y:10,v:Chord.D,c:0},{x:1,y:10,v:Chord.Dm,c:0},{x:0,y:10,v:Chord.D7,c:0},
    {x:5,y:11,v:Bass.C,c:0},{x:4,y:11,v:Bass.CD,c:1},{x:3,y:11,v:Bass.A,c:0},{x:2,y:11,v:Chord.A,c:0},{x:1,y:11,v:Chord.Am,c:0},{x:0,y:11,v:Chord.A7,c:0},
    {x:5,y:12,v:Bass.G,c:0},{x:4,y:12,v:Bass.GA,c:1},{x:3,y:12,v:Bass.E,c:0},{x:2,y:12,v:Chord.E,c:0},{x:1,y:12,v:Chord.Em,c:0},{x:0,y:12,v:Chord.E7,c:0},
    {x:5,y:13,v:Bass.D,c:0},{x:4,y:13,v:Bass.DE,c:1},{x:3,y:13,v:Bass.B,c:0},{x:2,y:13,v:Chord.B,c:0},{x:1,y:13,v:Chord.Bm,c:0},{x:0,y:13,v:Chord.B7,c:0},
    {x:5,y:14,v:Bass.A,c:0},{x:4,y:14,v:Bass.AB,c:1},{x:3,y:14,v:Bass.FG,c:1},{x:2,y:14,v:Chord.FG,c:1},{x:1,y:14,v:Chord.FGm,c:1},{x:0,y:14,v:Chord.FG7,c:1},
    {x:5,y:15,v:Bass.E,c:0},{x:4,y:15,v:Bass.F,c:0},{x:3,y:15,v:Bass.CD,c:1},{x:2,y:15,v:Chord.CD,c:1},{x:1,y:15,v:Chord.CDm,c:1},{x:0,y:15,v:Chord.CD7,c:1},
    {x:5,y:16,v:Bass.B,c:0},{x:4,y:16,v:Bass.C,c:0},{x:3,y:16,v:Bass.GA,c:1},{x:2,y:16,v:Chord.GA,c:1},{x:1,y:16,v:Chord.GAm,c:1},{x:0,y:16,v:Chord.GA7,c:1},
    {x:5,y:17,v:Bass.FG,c:1},{x:4,y:17,v:Bass.G,c:0},{x:3,y:17,v:Bass.DE,c:1},{x:2,y:17,v:Chord.DE,c:1},{x:1,y:17,v:Chord.DEm,c:1},{x:0,y:17,v:Chord.DE7,c:1},
    {x:5,y:18,v:Bass.CD,c:1},{x:4,y:18,v:Bass.D,c:0},{x:3,y:18,v:Bass.AB,c:1},{x:2,y:18,v:Chord.AB,c:1},{x:1,y:18,v:Chord.ABm,c:1},{x:0,y:18,v:Chord.AB7,c:1},
    {x:5,y:19,v:Bass.GA,c:1},{x:4,y:19,v:Bass.A,c:0},{x:3,y:19,v:Bass.F,c:0},{x:2,y:19,v:Chord.F,c:0},{x:1,y:19,v:Chord.Fm,c:0},{x:0,y:19,v:Chord.F7,c:0},

  ]
};


export const LEFT_HAND_TEACHER_120_3_BS_ROWS_BX_A_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: -6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 4,
  offsetXFactor: 1,
  bassesHighlighterPoints:[0, 0, 3, 0, 3, 20, 0, 20],

  keys: [
    {x:0,y:0,v:Bass.G,c:0},{x:1,y:0,v:Bass.GA,c:1},{x:2,y:0,v:Bass.E,c:0},{x:3,y:0,v:Chord.E,c:0},{x:4,y:0,v:Chord.Em,c:0},{x:5,y:0,v:Chord.E7,c:0},
    {x:0,y:1,v:Bass.D,c:0},{x:1,y:1,v:Bass.DE,c:1},{x:2,y:1,v:Bass.B,c:0},{x:3,y:1,v:Chord.B,c:0}, {x:4,y:1,v:Chord.Bm,c:0},{x:5,y:1,v:Chord.B7,c:0},
    {x:0,y:2,v:Bass.A,c:0},{x:1,y:2,v:Bass.AB,c:1},{x:2,y:2,v:Bass.FG,c:1},{x:3,y:2,v:Chord.FG,c:1},{x:4,y:2,v:Chord.FGm,c:1},{x:5,y:2,v:Chord.FG7,c:1},
    {x:0,y:3,v:Bass.E,c:0},{x:1,y:3,v:Bass.F,c:0},{x:2,y:3,v:Bass.CD,c:1},{x:3,y:3,v:Chord.CD,c:1},{x:4,y:3,v:Chord.CDm,c:1},{x:5,y:3,v:Chord.CD7,c:1},
    {x:0,y:4,v:Bass.B,c:0},{x:1,y:4,v:Bass.C,c:0},{x:2,y:4,v:Bass.GA,c:1},{x:3,y:4,v:Chord.GA,c:1},{x:4,y:4,v:Chord.GAm,c:1},{x:5,y:4,v:Chord.GA7,c:1},
    {x:0,y:5,v:Bass.FG,c:1},{x:1,y:5,v:Bass.G,c:0},{x:2,y:5,v:Bass.DE,c:1},{x:3,y:5,v:Chord.DE,c:1},{x:4,y:5,v:Chord.DEm,c:1},{x:5,y:5,v:Chord.DE7,c:1},
    {x:0,y:6,v:Bass.CD,c:1},{x:1,y:6,v:Bass.D,c:0},{x:2,y:6,v:Bass.AB,c:1},{x:3,y:6,v:Chord.AB,c:1},{x:4,y:6,v:Chord.ABm,c:1},{x:5,y:6,v:Chord.AB7,c:1},
    {x:0,y:7,v:Bass.GA,c:1},{x:1,y:7,v:Bass.A,c:0},{x:2,y:7,v:Bass.F,c:0},{x:3,y:7,v:Chord.F,c:0},{x:4,y:7,v:Chord.Fm,c:0},{x:5,y:7,v:Chord.F7,c:0},
    {x:0,y:8,v:Bass.DE,c:1},{x:1,y:8,v:Bass.E,c:0},{x:2,y:8,v:Bass.C,c:0},{x:3,y:8,v:Chord.C,c:0},{x:4,y:8,v:Chord.Cm,c:0},{x:5,y:8,v:Chord.C7,c:0},
    {x:0,y:9,v:Bass.AB,c:1},{x:1,y:9,v:Bass.B,c:0},{x:2,y:9,v:Bass.G,c:0},{x:3,y:9,v:Chord.G,c:0},{x:4,y:9,v:Chord.Gm,c:0},{x:5,y:9,v:Chord.G7,c:0},
    {x:0,y:10,v:Bass.F,c:0},{x:1,y:10,v:Bass.FG,c:1},{x:2,y:10,v:Bass.D,c:0},{x:3,y:10,v:Chord.D,c:0},{x:4,y:10,v:Chord.Dm,c:0},{x:5,y:10,v:Chord.D7,c:0},
    {x:0,y:11,v:Bass.C,c:0},{x:1,y:11,v:Bass.CD,c:1},{x:2,y:11,v:Bass.A,c:0},{x:3,y:11,v:Chord.A,c:0},{x:4,y:11,v:Chord.Am,c:0},{x:5,y:11,v:Chord.A7,c:0},
    {x:0,y:12,v:Bass.G,c:0},{x:1,y:12,v:Bass.GA,c:1},{x:2,y:12,v:Bass.E,c:0},{x:3,y:12,v:Chord.E,c:0},{x:4,y:12,v:Chord.Em,c:0},{x:5,y:12,v:Chord.E7,c:0},
    {x:0,y:13,v:Bass.D,c:0},{x:1,y:13,v:Bass.DE,c:1},{x:2,y:13,v:Bass.B,c:0},{x:3,y:13,v:Chord.B,c:0},{x:4,y:13,v:Chord.Bm,c:0},{x:5,y:13,v:Chord.B7,c:0},
    {x:0,y:14,v:Bass.A,c:0},{x:1,y:14,v:Bass.AB,c:1},{x:2,y:14,v:Bass.FG,c:1},{x:3,y:14,v:Chord.FG,c:1},{x:4,y:14,v:Chord.FGm,c:1},{x:5,y:14,v:Chord.FG7,c:1},
    {x:0,y:15,v:Bass.E,c:0},{x:1,y:15,v:Bass.F,c:0},{x:2,y:15,v:Bass.CD,c:1},{x:3,y:15,v:Chord.CD,c:1},{x:4,y:15,v:Chord.CDm,c:1},{x:5,y:15,v:Chord.CD7,c:1},
    {x:0,y:16,v:Bass.B,c:0},{x:1,y:16,v:Bass.C,c:0},{x:2,y:16,v:Bass.GA,c:1},{x:3,y:16,v:Chord.GA,c:1},{x:4,y:16,v:Chord.GAm,c:1},{x:5,y:16,v:Chord.GA7,c:1},
    {x:0,y:17,v:Bass.FG,c:1},{x:1,y:17,v:Bass.G,c:0},{x:2,y:17,v:Bass.DE,c:1},{x:3,y:17,v:Chord.DE,c:1},{x:4,y:17,v:Chord.DEm,c:1},{x:5,y:17,v:Chord.DE7,c:1},
    {x:0,y:18,v:Bass.CD,c:1},{x:1,y:18,v:Bass.D,c:0},{x:2,y:18,v:Bass.AB,c:1},{x:3,y:18,v:Chord.AB,c:1},{x:4,y:18,v:Chord.ABm,c:1},{x:5,y:18,v:Chord.AB7,c:1},
    {x:0,y:19,v:Bass.GA,c:1},{x:1,y:19,v:Bass.A,c:0},{x:2,y:19,v:Bass.F,c:0},{x:3,y:19,v:Chord.F,c:0},{x:4,y:19,v:Chord.Fm,c:0},{x:5,y:19,v:Chord.F7,c:0}
  ]
};

//7
export const LEFT_HAND_MIRROR_120_3_BS_ROWS_BX_B_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: 6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 2.5,
  offsetXFactor: 1,
  bassesHighlighterPoints: [3, 0, 6, 0, 6, 20, 3, 20],

  keys: [
    {x:5,y:0,v:Bass.G,c:0},{x:4,y:0,v:Bass.GA,c:1},{x:3,y:0,v:Bass.E,c:0},{x:2,y:0,v:Chord.E,c:0},{x:1,y:0,v:Chord.Em,c:0},{x:0,y:0,v:Chord.A7,c:0},
    {x:5,y:1,v:Bass.D,c:0},{x:4,y:1,v:Bass.DE,c:1},{x:3,y:1,v:Bass.B,c:0},{x:2,y:1,v:Chord.B,c:0},{x:1,y:1,v:Chord.Bm,c:0},{x:0,y:1,v:Chord.E7,c:0},
    {x:5,y:2,v:Bass.A,c:0},{x:4,y:2,v:Bass.AB,c:1},{x:3,y:2,v:Bass.FG,c:1},{x:2,y:2,v:Chord.FG,c:1},{x:1,y:2,v:Chord.FGm,c:1},{x:0,y:2,v:Chord.B7,c:0},
    {x:5,y:3,v:Bass.E,c:0},{x:4,y:3,v:Bass.F,c:0},{x:3,y:3,v:Bass.CD,c:1},{x:2,y:3,v:Chord.CD,c:1},{x:1,y:3,v:Chord.CDm,c:1},{x:0,y:3,v:Chord.FG7,c:1},
    {x:5,y:4,v:Bass.B,c:0},{x:4,y:4,v:Bass.C,c:0},{x:3,y:4,v:Bass.GA,c:1},{x:2,y:4,v:Chord.GA,c:1},{x:1,y:4,v:Chord.GAm,c:1},{x:0,y:4,v:Chord.CD7,c:1},
    {x:5,y:5,v:Bass.FG,c:1},{x:4,y:5,v:Bass.G,c:0},{x:3,y:5,v:Bass.DE,c:1},{x:2,y:5,v:Chord.DE,c:1},{x:1,y:5,v:Chord.DEm,c:1},{x:0,y:5,v:Chord.GA7,c:1},
    {x:5,y:6,v:Bass.CD,c:1},{x:4,y:6,v:Bass.D,c:0},{x:3,y:6,v:Bass.AB,c:1},{x:2,y:6,v:Chord.AB,c:1},{x:1,y:6,v:Chord.ABm,c:1},{x:0,y:6,v:Chord.DE7,c:1},
    {x:5,y:7,v:Bass.GA,c:1},{x:4,y:7,v:Bass.A,c:0},{x:3,y:7,v:Bass.F,c:0},{x:2,y:7,v:Chord.F,c:0},{x:1,y:7,v:Chord.Fm,c:0},{x:0,y:7,v:Chord.AB7,c:1},
    {x:5,y:8,v:Bass.DE,c:1},{x:4,y:8,v:Bass.E,c:0},{x:3,y:8,v:Bass.C,c:0},{x:2,y:8,v:Chord.C,c:0},{x:1,y:8,v:Chord.Cm,c:0},{x:0,y:8,v:Chord.F7,c:0},
    {x:5,y:9,v:Bass.AB,c:1},{x:4,y:9,v:Bass.B,c:0},{x:3,y:9,v:Bass.G,c:0},{x:2,y:9,v:Chord.G,c:0},{x:1,y:9,v:Chord.Gm,c:0},{x:0,y:9,v:Chord.C7,c:0},
    {x:5,y:10,v:Bass.F,c:0},{x:4,y:10,v:Bass.FG,c:1},{x:3,y:10,v:Bass.D,c:0},{x:2,y:10,v:Chord.D,c:0},{x:1,y:10,v:Chord.Dm,c:0},{x:0,y:10,v:Chord.G7,c:0},
    {x:5,y:11,v:Bass.C,c:0},{x:4,y:11,v:Bass.CD,c:1},{x:3,y:11,v:Bass.A,c:0},{x:2,y:11,v:Chord.A,c:0},{x:1,y:11,v:Chord.Am,c:0},{x:0,y:11,v:Chord.D7,c:0},
    {x:5,y:12,v:Bass.G,c:0},{x:4,y:12,v:Bass.GA,c:1},{x:3,y:12,v:Bass.E,c:0},{x:2,y:12,v:Chord.E,c:0},{x:1,y:12,v:Chord.Em,c:0},{x:0,y:12,v:Chord.A7,c:0},
    {x:5,y:13,v:Bass.D,c:0},{x:4,y:13,v:Bass.DE,c:1},{x:3,y:13,v:Bass.B,c:0},{x:2,y:13,v:Chord.B,c:0},{x:1,y:13,v:Chord.Bm,c:0},{x:0,y:13,v:Chord.E7,c:0},
    {x:5,y:14,v:Bass.A,c:0},{x:4,y:14,v:Bass.AB,c:1},{x:3,y:14,v:Bass.FG,c:1},{x:2,y:14,v:Chord.FG,c:1},{x:1,y:14,v:Chord.FGm,c:1},{x:0,y:14,v:Chord.B7,c:0},
    {x:5,y:15,v:Bass.E,c:0},{x:4,y:15,v:Bass.F,c:0},{x:3,y:15,v:Bass.CD,c:1},{x:2,y:15,v:Chord.CD,c:1},{x:1,y:15,v:Chord.CDm,c:1},{x:0,y:15,v:Chord.FG7,c:1},
    {x:5,y:16,v:Bass.B,c:0},{x:4,y:16,v:Bass.C,c:0},{x:3,y:16,v:Bass.GA,c:1},{x:2,y:16,v:Chord.GA,c:1},{x:1,y:16,v:Chord.GAm,c:1},{x:0,y:16,v:Chord.CD7,c:1},
    {x:5,y:17,v:Bass.FG,c:1},{x:4,y:17,v:Bass.G,c:0},{x:3,y:17,v:Bass.DE,c:1},{x:2,y:17,v:Chord.DE,c:1},{x:1,y:17,v:Chord.DEm,c:1},{x:0,y:17,v:Chord.GA7,c:1},
    {x:5,y:18,v:Bass.CD,c:1},{x:4,y:18,v:Bass.D,c:0},{x:3,y:18,v:Bass.AB,c:1},{x:2,y:18,v:Chord.AB,c:1},{x:1,y:18,v:Chord.ABm,c:1},{x:0,y:18,v:Chord.DE7,c:1},
    {x:5,y:19,v:Bass.GA,c:1},{x:4,y:19,v:Bass.A,c:0},{x:3,y:19,v:Bass.F,c:0},{x:2,y:19,v:Chord.F,c:0},{x:1,y:19,v:Chord.Fm,c:0},{x:0,y:19,v:Chord.AB7,c:1},

  ]
};


export const LEFT_HAND_TEACHER_120_3_BS_ROWS_BX_B_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: -6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 4,
  offsetXFactor: 1,
  bassesHighlighterPoints:[0, 0, 3, 0, 3, 20, 0, 20],

  keys: [
    {x:0,y:0,v:Bass.G,c:0},{x:1,y:0,v:Bass.GA,c:1},{x:2,y:0,v:Bass.E,c:0},{x:3,y:0,v:Chord.E,c:0},{x:4,y:0,v:Chord.Em,c:0},{x:5,y:0,v:Chord.A7,c:0},
    {x:0,y:1,v:Bass.D,c:0},{x:1,y:1,v:Bass.DE,c:1},{x:2,y:1,v:Bass.B,c:0},{x:3,y:1,v:Chord.B,c:0}, {x:4,y:1,v:Chord.Bm,c:0},{x:5,y:1,v:Chord.E7,c:0},
    {x:0,y:2,v:Bass.A,c:0},{x:1,y:2,v:Bass.AB,c:1},{x:2,y:2,v:Bass.FG,c:1},{x:3,y:2,v:Chord.FG,c:1},{x:4,y:2,v:Chord.FGm,c:1},{x:5,y:2,v:Chord.B7,c:0},
    {x:0,y:3,v:Bass.E,c:0},{x:1,y:3,v:Bass.F,c:0},{x:2,y:3,v:Bass.CD,c:1},{x:3,y:3,v:Chord.CD,c:1},{x:4,y:3,v:Chord.CDm,c:1},{x:5,y:3,v:Chord.FG7,c:1},
    {x:0,y:4,v:Bass.B,c:0},{x:1,y:4,v:Bass.C,c:0},{x:2,y:4,v:Bass.GA,c:1},{x:3,y:4,v:Chord.GA,c:1},{x:4,y:4,v:Chord.GAm,c:1},{x:5,y:4,v:Chord.CD7,c:1},
    {x:0,y:5,v:Bass.FG,c:1},{x:1,y:5,v:Bass.G,c:0},{x:2,y:5,v:Bass.DE,c:1},{x:3,y:5,v:Chord.DE,c:1},{x:4,y:5,v:Chord.DEm,c:1},{x:5,y:5,v:Chord.GA7,c:1},
    {x:0,y:6,v:Bass.CD,c:1},{x:1,y:6,v:Bass.D,c:0},{x:2,y:6,v:Bass.AB,c:1},{x:3,y:6,v:Chord.AB,c:1},{x:4,y:6,v:Chord.ABm,c:1},{x:5,y:6,v:Chord.DE7,c:1},
    {x:0,y:7,v:Bass.GA,c:1},{x:1,y:7,v:Bass.A,c:0},{x:2,y:7,v:Bass.F,c:0},{x:3,y:7,v:Chord.F,c:0},{x:4,y:7,v:Chord.Fm,c:0},{x:5,y:7,v:Chord.AB7,c:1},
    {x:0,y:8,v:Bass.DE,c:1},{x:1,y:8,v:Bass.E,c:0},{x:2,y:8,v:Bass.C,c:0},{x:3,y:8,v:Chord.C,c:0},{x:4,y:8,v:Chord.Cm,c:0},{x:5,y:8,v:Chord.F7,c:0},
    {x:0,y:9,v:Bass.AB,c:1},{x:1,y:9,v:Bass.B,c:0},{x:2,y:9,v:Bass.G,c:0},{x:3,y:9,v:Chord.G,c:0},{x:4,y:9,v:Chord.Gm,c:0},{x:5,y:9,v:Chord.C7,c:0},
    {x:0,y:10,v:Bass.F,c:0},{x:1,y:10,v:Bass.FG,c:1},{x:2,y:10,v:Bass.D,c:0},{x:3,y:10,v:Chord.D,c:0},{x:4,y:10,v:Chord.Dm,c:0},{x:5,y:10,v:Chord.G7,c:0},
    {x:0,y:11,v:Bass.C,c:0},{x:1,y:11,v:Bass.CD,c:1},{x:2,y:11,v:Bass.A,c:0},{x:3,y:11,v:Chord.A,c:0},{x:4,y:11,v:Chord.Am,c:0},{x:5,y:11,v:Chord.D7,c:0},
    {x:0,y:12,v:Bass.G,c:0},{x:1,y:12,v:Bass.GA,c:1},{x:2,y:12,v:Bass.E,c:0},{x:3,y:12,v:Chord.E,c:0},{x:4,y:12,v:Chord.Em,c:0},{x:5,y:12,v:Chord.A7,c:0},
    {x:0,y:13,v:Bass.D,c:0},{x:1,y:13,v:Bass.DE,c:1},{x:2,y:13,v:Bass.B,c:0},{x:3,y:13,v:Chord.B,c:0},{x:4,y:13,v:Chord.Bm,c:0},{x:5,y:13,v:Chord.E7,c:0},
    {x:0,y:14,v:Bass.A,c:0},{x:1,y:14,v:Bass.AB,c:1},{x:2,y:14,v:Bass.FG,c:1},{x:3,y:14,v:Chord.FG,c:1},{x:4,y:14,v:Chord.FGm,c:1},{x:5,y:14,v:Chord.B7,c:0},
    {x:0,y:15,v:Bass.E,c:0},{x:1,y:15,v:Bass.F,c:0},{x:2,y:15,v:Bass.CD,c:1},{x:3,y:15,v:Chord.CD,c:1},{x:4,y:15,v:Chord.CDm,c:1},{x:5,y:15,v:Chord.FG7,c:1},
    {x:0,y:16,v:Bass.B,c:0},{x:1,y:16,v:Bass.C,c:0},{x:2,y:16,v:Bass.GA,c:1},{x:3,y:16,v:Chord.GA,c:1},{x:4,y:16,v:Chord.GAm,c:1},{x:5,y:16,v:Chord.CD7,c:1},
    {x:0,y:17,v:Bass.FG,c:1},{x:1,y:17,v:Bass.G,c:0},{x:2,y:17,v:Bass.DE,c:1},{x:3,y:17,v:Chord.DE,c:1},{x:4,y:17,v:Chord.DEm,c:1},{x:5,y:17,v:Chord.GA7,c:1},
    {x:0,y:18,v:Bass.CD,c:1},{x:1,y:18,v:Bass.D,c:0},{x:2,y:18,v:Bass.AB,c:1},{x:3,y:18,v:Chord.AB,c:1},{x:4,y:18,v:Chord.ABm,c:1},{x:5,y:18,v:Chord.DE7,c:1},
    {x:0,y:19,v:Bass.GA,c:1},{x:1,y:19,v:Bass.A,c:0},{x:2,y:19,v:Bass.F,c:0},{x:3,y:19,v:Chord.F,c:0},{x:4,y:19,v:Chord.Fm,c:0},{x:5,y:19,v:Chord.AB7,c:0}
  ]
};

//8
export const LEFT_HAND_MIRROR_120_3_BS_ROWS_BELGIUM_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: 6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 2.5,
  offsetXFactor: 1,
  bassesHighlighterPoints: [3, 0, 6, 0, 6, 20, 3, 20],

  keys: [
    {x:5,y:0,v:Bass.C,c:0},{x:4,y:0,v:Bass.FG,c:1},{x:3,y:0,v:Bass.D,c:0},{x:2,y:0,v:Chord.D,c:0},{x:1,y:0,v:Chord.Dm,c:0},{x:0,y:0,v:Chord.G7,c:0},
    {x:5,y:1,v:Bass.G,c:0},{x:4,y:1,v:Bass.CD,c:1},{x:3,y:1,v:Bass.A,c:0},{x:2,y:1,v:Chord.A,c:0},{x:1,y:1,v:Chord.Am,c:0},{x:0,y:1,v:Chord.D7,c:0},
    {x:5,y:2,v:Bass.D,c:0},{x:4,y:2,v:Bass.GA,c:1},{x:3,y:2,v:Bass.E,c:0},{x:2,y:2,v:Chord.E,c:0},{x:1,y:2,v:Chord.Em,c:0},{x:0,y:2,v:Chord.A7,c:0},
    {x:5,y:3,v:Bass.A,c:0},{x:4,y:3,v:Bass.DE,c:1},{x:3,y:3,v:Bass.B,c:0},{x:2,y:3,v:Chord.B,c:0},{x:1,y:3,v:Chord.Bm,c:0},{x:0,y:3,v:Chord.E7,c:0},
    {x:5,y:4,v:Bass.E,c:0},{x:4,y:4,v:Bass.AB,c:1},{x:3,y:4,v:Bass.FG,c:1},{x:2,y:4,v:Chord.FG,c:1},{x:1,y:4,v:Chord.FGm,c:1},{x:0,y:4,v:Chord.B7,c:0},
    {x:5,y:5,v:Bass.B,c:0},{x:4,y:5,v:Bass.F,c:0},{x:3,y:5,v:Bass.CD,c:1},{x:2,y:5,v:Chord.CD,c:1},{x:1,y:5,v:Chord.CDm,c:1},{x:0,y:5,v:Chord.FG7,c:1},
    {x:5,y:6,v:Bass.FG,c:1},{x:4,y:6,v:Bass.C,c:0},{x:3,y:6,v:Bass.GA,c:1},{x:2,y:6,v:Chord.GA,c:1},{x:1,y:6,v:Chord.GAm,c:1},{x:0,y:6,v:Chord.CD7,c:1},
    {x:5,y:7,v:Bass.CD,c:1},{x:4,y:7,v:Bass.G,c:0},{x:3,y:7,v:Bass.DE,c:1},{x:2,y:7,v:Chord.DE,c:1},{x:1,y:7,v:Chord.DEm,c:1},{x:0,y:7,v:Chord.GA7,c:1},
    {x:5,y:8,v:Bass.GA,c:1},{x:4,y:8,v:Bass.D,c:0},{x:3,y:8,v:Bass.AB,c:1},{x:2,y:8,v:Chord.AB,c:1},{x:1,y:8,v:Chord.ABm,c:1},{x:0,y:8,v:Chord.DE7,c:1},
    {x:5,y:9,v:Bass.DE,c:1},{x:4,y:9,v:Bass.A,c:0},{x:3,y:9,v:Bass.F,c:0},{x:2,y:9,v:Chord.F,c:0},{x:1,y:9,v:Chord.Fm,c:0},{x:0,y:9,v:Chord.AB7,c:1},
    {x:5,y:10,v:Bass.AB,c:1},{x:4,y:10,v:Bass.E,c:0},{x:3,y:10,v:Bass.C,c:0},{x:2,y:10,v:Chord.C,c:0},{x:1,y:10,v:Chord.Cm,c:0},{x:0,y:10,v:Chord.F7,c:0},
    {x:5,y:11,v:Bass.F,c:0},{x:4,y:11,v:Bass.B,c:0},{x:3,y:11,v:Bass.G,c:0},{x:2,y:11,v:Chord.G,c:0},{x:1,y:11,v:Chord.Gm,c:0},{x:0,y:11,v:Chord.C7,c:0},
    {x:5,y:12,v:Bass.C,c:0},{x:4,y:12,v:Bass.FG,c:1},{x:3,y:12,v:Bass.D,c:0},{x:2,y:12,v:Chord.D,c:0},{x:1,y:12,v:Chord.Dm,c:0},{x:0,y:12,v:Chord.G7,c:0},
    {x:5,y:13,v:Bass.G,c:0},{x:4,y:13,v:Bass.CD,c:1},{x:3,y:13,v:Bass.A,c:0},{x:2,y:13,v:Chord.A,c:0},{x:1,y:13,v:Chord.Am,c:0},{x:0,y:13,v:Chord.D7,c:0},
    {x:5,y:14,v:Bass.D,c:0},{x:4,y:14,v:Bass.GA,c:1},{x:3,y:14,v:Bass.E,c:0},{x:2,y:14,v:Chord.E,c:0},{x:1,y:14,v:Chord.Em,c:0},{x:0,y:14,v:Chord.A7,c:0},
    {x:5,y:15,v:Bass.A,c:0},{x:4,y:15,v:Bass.DE,c:1},{x:3,y:15,v:Bass.B,c:0},{x:2,y:15,v:Chord.B,c:0},{x:1,y:15,v:Chord.Bm,c:0},{x:0,y:15,v:Chord.E7,c:0},
    {x:5,y:16,v:Bass.E,c:0},{x:4,y:16,v:Bass.AB,c:1},{x:3,y:16,v:Bass.FG,c:1},{x:2,y:16,v:Chord.FG,c:1},{x:1,y:16,v:Chord.FGm,c:1},{x:0,y:16,v:Chord.B7,c:0},
    {x:5,y:17,v:Bass.B,c:0},{x:4,y:17,v:Bass.F,c:0},{x:3,y:17,v:Bass.CD,c:1},{x:2,y:17,v:Chord.CD,c:1},{x:1,y:17,v:Chord.CDm,c:1},{x:0,y:17,v:Chord.FG7,c:1},
    {x:5,y:18,v:Bass.FG,c:1},{x:4,y:18,v:Bass.C,c:0},{x:3,y:18,v:Bass.GA,c:1},{x:2,y:18,v:Chord.GA,c:1},{x:1,y:18,v:Chord.GAm,c:1},{x:0,y:18,v:Chord.CD7,c:1},
    {x:5,y:19,v:Bass.CD,c:1},{x:4,y:19,v:Bass.G,c:0},{x:3,y:19,v:Bass.DE,c:1},{x:2,y:19,v:Chord.DE,c:1},{x:1,y:19,v:Chord.DEm,c:1},{x:0,y:19,v:Chord.GA7,c:1},

  ]
};

export const LEFT_HAND_TEACHER_120_3_BS_ROWS_BELGIUM_LAYOUT = {
  rows: 20,
  columns: 6,
  verticalSkewFactor: -6,
  radiusFactor: 0.8,
  cellFactor: 0.95,
  offsetYFactor: 4,
  offsetXFactor: 1,
  bassesHighlighterPoints:[0, 0, 3, 0, 3, 20, 0, 20],

  keys: [
    {x:0,y:0,v:Bass.C,c:0},{x:1,y:0,v:Bass.FG,c:1},{x:2,y:0,v:Bass.D,c:0},{x:3,y:0,v:Chord.D,c:0},{x:4,y:0,v:Chord.Dm,c:0},
    {x:5,y:0,v:Chord.G7,c:0},{x:0,y:1,v:Bass.G,c:0},{x:1,y:1,v:Bass.CD,c:1},{x:2,y:1,v:Bass.A,c:0},{x:3,y:1,v:Chord.A,c:0},
    {x:4,y:1,v:Chord.Am,c:0},{x:5,y:1,v:Chord.D7,c:0},{x:0,y:2,v:Bass.D,c:0},{x:1,y:2,v:Bass.GA,c:1},{x:2,y:2,v:Bass.E,c:0},
    {x:3,y:2,v:Chord.E,c:0},{x:4,y:2,v:Chord.Em,c:0},{x:5,y:2,v:Chord.A7,c:0},{x:0,y:3,v:Bass.A,c:0},{x:1,y:3,v:Bass.DE,c:1},
    {x:2,y:3,v:Bass.B,c:0},{x:3,y:3,v:Chord.B,c:0},{x:4,y:3,v:Chord.Bm,c:0},{x:5,y:3,v:Chord.E7,c:0},{x:0,y:4,v:Bass.E,c:0},
    {x:1,y:4,v:Bass.AB,c:1},{x:2,y:4,v:Bass.FG,c:1},{x:3,y:4,v:Chord.FG,c:1},{x:4,y:4,v:Chord.FGm,c:1},{x:5,y:4,v:Chord.B7,c:0},
    {x:0,y:5,v:Bass.B,c:0},{x:1,y:5,v:Bass.F,c:0},{x:2,y:5,v:Bass.CD,c:1},{x:3,y:5,v:Chord.CD,c:1},{x:4,y:5,v:Chord.CDm,c:1},
    {x:5,y:5,v:Chord.FG7,c:1},{x:0,y:6,v:Bass.FG,c:1},{x:1,y:6,v:Bass.C,c:0},{x:2,y:6,v:Bass.GA,c:1},{x:3,y:6,v:Chord.GA,c:1},
    {x:4,y:6,v:Chord.GAm,c:1},{x:5,y:6,v:Chord.CD7,c:1},{x:0,y:7,v:Bass.CD,c:1},{x:1,y:7,v:Bass.G,c:0},{x:2,y:7,v:Bass.DE,c:1},
    {x:3,y:7,v:Chord.DE,c:1},{x:4,y:7,v:Chord.DEm,c:1},{x:5,y:7,v:Chord.GA7,c:1},{x:0,y:8,v:Bass.GA,c:1},{x:1,y:8,v:Bass.D,c:0},
    {x:2,y:8,v:Bass.AB,c:1},{x:3,y:8,v:Chord.AB,c:1},{x:4,y:8,v:Chord.ABm,c:1},{x:5,y:8,v:Chord.DE7,c:1},{x:0,y:9,v:Bass.DE,c:1},
    {x:1,y:9,v:Bass.A,c:0},{x:2,y:9,v:Bass.F,c:0},{x:3,y:9,v:Chord.F,c:0},{x:4,y:9,v:Chord.Fm,c:0},{x:5,y:9,v:Chord.AB7,c:1},
    {x:0,y:10,v:Bass.AB,c:1},{x:1,y:10,v:Bass.E,c:0},{x:2,y:10,v:Bass.C,c:0},{x:3,y:10,v:Chord.C,c:0},{x:4,y:10,v:Chord.Cm,c:0},
    {x:5,y:10,v:Chord.F7,c:0},{x:0,y:11,v:Bass.F,c:0},{x:1,y:11,v:Bass.B,c:0},{x:2,y:11,v:Bass.G,c:0},{x:3,y:11,v:Chord.G,c:0},
    {x:4,y:11,v:Chord.Gm,c:0},{x:5,y:11,v:Chord.C7,c:0},{x:0,y:12,v:Bass.C,c:0},{x:1,y:12,v:Bass.FG,c:1},{x:2,y:12,v:Bass.D,c:0},
    {x:3,y:12,v:Chord.D,c:0},{x:4,y:12,v:Chord.Dm,c:0},{x:5,y:12,v:Chord.G7,c:0},{x:0,y:13,v:Bass.G,c:0},{x:1,y:13,v:Bass.CD,c:1},
    {x:2,y:13,v:Bass.A,c:0},{x:3,y:13,v:Chord.A,c:0},{x:4,y:13,v:Chord.Am,c:0},{x:5,y:13,v:Chord.D7,c:0},{x:0,y:14,v:Bass.D,c:0},
    {x:1,y:14,v:Bass.GA,c:1},{x:2,y:14,v:Bass.E,c:0},{x:3,y:14,v:Chord.E,c:0},{x:4,y:14,v:Chord.Em,c:0},{x:5,y:14,v:Chord.A7,c:0},
    {x:0,y:15,v:Bass.A,c:0},{x:1,y:15,v:Bass.DE,c:1},{x:2,y:15,v:Bass.B,c:0},{x:3,y:15,v:Chord.B,c:0},{x:4,y:15,v:Chord.Bm,c:0},
    {x:5,y:15,v:Chord.E7,c:0},{x:0,y:16,v:Bass.E,c:0},{x:1,y:16,v:Bass.AB,c:1},{x:2,y:16,v:Bass.FG,c:1},{x:3,y:16,v:Chord.FG,c:1},
    {x:4,y:16,v:Chord.FGm,c:1},{x:5,y:16,v:Chord.B7,c:0},{x:0,y:17,v:Bass.B,c:0},{x:1,y:17,v:Bass.F,c:0},{x:2,y:17,v:Bass.CD,c:1},
    {x:3,y:17,v:Chord.CD,c:1},{x:4,y:17,v:Chord.CDm,c:1},{x:5,y:17,v:Chord.FG7,c:1},{x:0,y:18,v:Bass.FG,c:1},{x:1,y:18,v:Bass.C,c:0},
    {x:2,y:18,v:Bass.GA,c:1},{x:3,y:18,v:Chord.GA,c:1},{x:4,y:18,v:Chord.GAm,c:1},{x:5,y:18,v:Chord.CD7,c:1},{x:0,y:19,v:Bass.CD,c:1},
    {x:1,y:19,v:Bass.G,c:0},{x:2,y:19,v:Bass.DE,c:1},{x:3,y:19,v:Chord.DE,c:1},{x:4,y:19,v:Chord.DEm,c:1},{x:5,y:19,v:Chord.GA7,c:1}
  ]
};

/**
 * ACCORDION
 */

export const PIANO_ACCORDION_LAYOUT = {
  instrument:Instrument.PIANO_ACCORDION,

  keys:[
    {y: 0, v: 53, c: 0},
    {y: 2, v: 55, c: 0},
    {y: 4, v: 57, c: 0},
    {y: 6, v: 59, c: 0},

    {y: 8, v: 60, c: 0},
    {y: 10, v: 62, c: 0},
    {y: 12, v: 64, c: 0},

    {y: 14, v: 65, c: 0},
    {y: 16, v: 67, c: 0},
    {y: 18, v: 69, c: 0},
    {y: 20, v: 71, c: 0},

    {y: 22, v: 72, c: 0},
    {y: 24, v: 74, c: 0},
    {y: 26, v: 76, c: 0},

    {y: 28, v: 77, c: 0},
    {y: 30, v: 79, c: 0},
    {y: 32, v: 81, c: 0},
    {y: 34, v: 83, c: 0},

    {y: 36, v: 84, c: 0},
    {y: 38, v: 86, c: 0},
    {y: 40, v: 88, c: 0},

    {y: 42, v: 89, c: 0},
    {y: 44, v: 91, c: 0},
    {y: 46, v: 93, c: 0},

    //blacks
    {y: 1.3, v: 54, c: 1},
    {y: 3.5, v: 56, c: 1},
    {y: 5.7, v: 58, c: 1},

    {y: 9.4, v: 61, c: 1},
    {y: 11.6, v: 63, c: 1},

    {y: 15.3, v: 66, c: 1},
    {y: 17.5, v: 68, c: 1},
    {y: 19.7, v: 70, c: 1},

    {y: 23.4, v: 73, c: 1},
    {y: 25.6, v: 75, c: 1},

    {y: 29.3, v: 78, c: 1},
    {y: 31.5, v: 80, c: 1},
    {y: 33.7, v: 82, c: 1},

    {y: 37.4, v: 85, c: 1},
    {y: 39.6, v: 87, c: 1},

    {y: 43.3, v: 90, c: 1},
    {y: 45.5, v: 92, c: 1}
  ]
};

/**
 * PIANO
 */

export const PIANO_LAYOUT = {
  instrument:Instrument.PIANO,

  keys:[
    //whites

    {x: 0, v: 21, c: 0},{x: 2, v: 23, c: 0},

    //1
    {x: 4, v: 24, c: 0}, {x: 6, v: 26, c: 0},{x: 8, v: 28, c: 0},
    {x: 10, v: 29, c: 0}, {x: 12, v: 31, c: 0}, {x: 14, v: 33, c: 0}, {x: 16, v: 35, c: 0},

    //2
    {x: 18, v: 36, c: 0},{x: 20, v: 38, c: 0}, {x: 22, v: 40, c: 0},
    {x: 24, v: 41, c: 0}, {x: 26, v: 43, c: 0},{x: 28, v: 45, c: 0}, {x: 30, v: 47, c: 0},

    //3
    {x: 32, v: 48, c: 0}, {x: 34, v: 50, c: 0}, {x: 36, v: 52, c: 0},
    {x: 38, v: 53, c: 0}, {x: 40, v: 55, c: 0}, {x: 42, v: 57, c: 0}, {x: 44, v: 59, c: 0},

    //4
    {x: 46, v: 60, c: 0},{x: 48, v: 62, c: 0}, {x: 50, v: 64, c: 0},
    {x: 52, v: 65, c: 0}, {x: 54, v: 67, c: 0}, {x: 56, v: 69, c: 0}, {x: 58, v: 71, c: 0},

    //5
    {x: 60, v: 72, c: 0},{x: 62, v: 74, c: 0}, {x: 64, v: 76, c: 0},
    {x: 66, v: 77, c: 0}, {x: 68, v: 79, c: 0}, {x: 70, v: 81, c: 0}, {x: 72, v: 83, c: 0},

    //6
    {x: 74, v: 84, c: 0},{x: 76, v: 86, c: 0}, {x: 78, v: 88, c: 0},
    {x: 80, v: 89, c: 0}, {x: 82, v: 91, c: 0}, {x: 84, v: 93, c: 0}, {x: 86, v: 95, c: 0},

    //7
    {x: 88, v: 96, c: 0},{x: 90, v: 98, c: 0}, {x: 92, v: 100, c: 0},
    {x: 94, v: 101, c: 0}, {x: 96, v: 103, c: 0}, {x: 98, v: 105, c: 0}, {x: 100, v: 107, c: 0},

    {x: 102, v: 108, c: 0},

    //blacks
    {x: 1.7, v: 22, c: 1},

    //1
    {x: 5.4, v: 25, c: 1}, {x: 7.6, v: 27, c: 1},
    {x: 11.3, v: 30, c: 1}, {x: 13.5, v: 32, c: 1}, {x: 15.7, v: 34, c: 1},

    //2
    {x: 19.4, v: 37, c: 1}, {x: 21.6, v: 39, c: 1},
    {x: 25.3, v: 42, c: 1},{x: 27.5, v: 44, c: 1}, {x: 29.7, v: 46, c: 1},

    // //3
    {x: 33.4, v: 49, c: 1}, {x: 35.6, v: 51, c: 1},
    {x: 39.3, v: 54, c: 1}, {x: 41.5, v: 56, c: 1},{x: 43.7, v: 58, c: 1},

    // //4
    {x: 47.4, v: 61, c: 1}, {x: 49.6, v: 63, c: 1},
    {x: 53.3, v: 66, c: 1}, {x: 55.5, v: 68, c: 1},{x: 57.7, v: 70, c: 1},

    // //5
    {x: 61.4, v: 73, c: 1}, {x: 63.6, v: 75, c: 1},
    {x: 67.3, v: 78, c: 1}, {x: 69.5, v: 80, c: 1},{x: 71.7, v: 82, c: 1},

    // //6
    {x: 75.4, v: 85, c: 1}, {x: 77.6, v: 87, c: 1},
    {x: 81.3, v: 90, c: 1}, {x: 83.5, v: 92, c: 1},{x: 85.7, v: 94, c: 1},

    // //7
    {x: 89.4, v: 97, c: 1}, {x: 91.6, v: 99, c: 1},
    {x: 95.3, v: 102, c: 1}, {x: 97.5, v: 104, c: 1},{x: 99.7, v: 106, c: 1}
  ]
};
