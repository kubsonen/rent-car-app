package pl.rentcar.server.util;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.*;

public class AppUtil {

    public static final String generateOrderNumber(Date date, String prefix) {
        SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/mm/ss/SSS");
        return prefix + sdf.format(date);
    }

    public static final int factorial(int n) {
        if (n > 10) return 0;
        if (n == 1) return 1;
        return factorial(n - 1) * n;
    }

    public static final <T> List<T[]> permutation(T[] table) {
        List<T[]> pTables = new ArrayList<>();
        executePermutation(pTables, table, table.length);
        return pTables;
    }

    private static final <T> void executePermutation(List<T[]> pTables, T[] table, int size) {

        if (size == 1) pTables.add(table.clone());

        for (int i = 0; i < size; i++) {
            executePermutation(pTables, table, size - 1);

            if (size % 2 == 1) {
                T temp = table[0]; //First element
                table[0] = table[size - 1];
                table[size - 1] = temp;
            } else {
                T temp = table[i]; //i element
                table[i] = table[size - 1];
                table[size - 1] = temp;
            }
        }

    }

    public static <T> List<T[]> combinations(T[] data, int k) {
        if (k > data.length) return null;
        List<T[]> combinations = new ArrayList<>();
        T[] temp = (T[]) Array.newInstance(data[0].getClass(), k);
        combination(combinations, data, temp, 0, data.length - 1, 0, k);
        return combinations;
    }

    private static <T> void combination(List<T[]> combinations, T[] elements, T[] temp, int start, int end, int index, int k) {
        if (index == k) {
            combinations.add(temp.clone());
            return;
        } else {

            for (int i = start; i <= end && end - i + 1 >= temp.length - index; i++) {
                temp[index] = elements[i];
                combination(combinations, elements, temp, i + 1, end, index + 1, k);
            }

        }


    }

    public static <T> List<T[]> variations(T[] elements, int k) {
        List<T[]> v = new ArrayList<>();
        T[] temp = (T[]) Array.newInstance(elements[0].getClass(), k);
        variation(v, elements, temp, k);
        return v;
    }

    private static <T> void variation(List<T[]> vs, T[] data, T[] temp, int depth) {
        if (depth == 0) {
            vs.add(temp.clone());
        } else {
            for (T t: data) {
                temp[depth - 1] = t;
                variation(vs, data, temp, depth - 1);
            }
        }
    }

}
