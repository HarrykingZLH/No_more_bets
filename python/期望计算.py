import numpy as np
import openpyxl
import pandas as pd

hexary_tree = np.zeros(9331, dtype=float)

def get_total_score(alist):
    alist.sort()
    total_score = sum(alist)
    total_score += extra_bonus(alist)
    return total_score


def extra_bonus(arr):
    num = [0] * 7
    for i in range(5):
        num[arr[i]] += 1
    arr_dist = []
    for i in range(len(arr) - 1):
        arr_dist.append(arr[i + 1] - arr[i])
    if arr_dist.count(0) == 4:
        return 100
    elif arr_dist.count(1) == 4:
        return 60
    elif arr_dist.count(0) == 3 and (arr[1] == arr[3]):
        return 40
    elif all(num[i] >= 1 for i in range(1, 5)):
        return 30
    elif all(num[i] >= 1 for i in range(2, 6)):
        return 30
    elif all(num[i] >= 1 for i in range(3, 7)):
        return 30
    elif arr_dist.count(0) == 3 and (arr[1] != arr[3]):
        return 20
    elif arr_dist.count(0) == 2:
        return 10
    else:
        return 0


def Cal_E(depth,index):
    if depth >= 5:
        return
    for i in range(1, 7):
        Cal_E(depth + 1, index * 6 + i)
        hexary_tree[index] += hexary_tree[index * 6 + i]
    hexary_tree[index] /= 6.0

def push_Hexary_Tree(index,score):
    hexary_tree[index] = score

def leaves():
    alist = [0,0,0,0,0]
    for i in range(1,7):
        for j in range(1, 7):
            for k in range(1, 7):
                for m in range(1, 7):
                    for n in range(1, 7):
                        total_score = get_total_score([i, j, k, m, n])
                        push_Hexary_Tree(((((0 * 6 + i) * 6 +j) * 6 + k) * 6 + m) * 6 + n, total_score)


if __name__ == '__main__':
    leaves()
    Cal_E(0, 0)
    workbook = openpyxl.Workbook()
    sheet = workbook.active
    sheet.append(['期望'])
    for i in hexary_tree:
        sheet.append([i])
    workbook.save('期望.xlsx')