package pl.rentcar.server;

import org.junit.Test;
import pl.rentcar.server.util.AppUtil;

import java.util.List;

public class MyUtilTest {

    @Test
    public void factorialTest() {
        System.out.println(AppUtil.factorial(10));
    }

    @Test
    public void permutationTest() {
        String[] arr = new String[] {"a", "b", "c"};
        List<String[]> strings = AppUtil.permutation(arr);
        for (String[] strings1: strings) {
            for (String t: strings1)
                System.out.print(t);
            System.out.println("");
        }
    }

    @Test
    public void combinationTest() {
        String[] arr = new String[]{"a","b","c","d","e","f","g","h"};
        List<String[]> cbs = AppUtil.combinations(arr, 3);
        for(String[] c: cbs){
            for (String s: c) System.out.print(s);
            System.out.println("");
        }
    }

    @Test
    public void variationTest() {
        String[] arr = new String[]{"a","b","c"};
        List<String[]> cbs = AppUtil.variations(arr, 5);
        for(String[] c: cbs){
            for (String s: c) System.out.print(s);
            System.out.println("");
        }
    }

}
