import { useState } from "react";

function useLevel5() {
  console.log("💡 Level 5");
  return useState(0);
}
function useLevel4() {
  console.log("Level 4");
  return useLevel5();
}
function useLevel3() {
  console.log("Level 3");
  return useLevel4();
}
function useLevel2() {
  console.log("Level 2");
  return useLevel3();
}
export default function useLevel1() {
  console.log("Level 1");
  return useLevel2();
}