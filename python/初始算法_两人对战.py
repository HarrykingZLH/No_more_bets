# 初始算法_两人对战
import random

player1_lock_list = []    # 存储玩家1锁定区
player2_lock_list = []    # 存储玩家2锁定区
player1_mul = 0   # 玩家1的倍数
player2_mul = 0   # 玩家2的倍数
total_mul = 1   # 总倍数
player1_point = 1000
player2_point = 1000

def init():
    global player1_lock_list,player2_lock_list,player1_mul,player2_mul,total_mul
    player1_lock_list = []    # 存储玩家1锁定区
    player2_lock_list = []    # 存储玩家2锁定区
    player1_mul = 0   # 玩家1的倍数
    player2_mul = 0   # 玩家2的倍数
    total_mul = 1   # 总倍数

def show_lock():
    print("两位玩家的锁定区： [", end="")
    print(player1_lock_list, end="，")
    print(player2_lock_list,end="")
    print("]")


def player1_choose():
    part_len = 5 - len(player1_lock_list)
    player1_temp_list = []
    for i in range(part_len):
        player1_temp_list.append(random.randint(1,5))
    print("player1的骰子区：",end="")
    print(player1_temp_list)

    input_array = []
    input_flag = True
    while input_flag:
        input_flag = False
        input_str = input("player1请选择锁定骰子（输入-1表示不锁定）：")
        input_list = input_str.split()
        flag_array = [0, 0, 0, 0, 0, 0]
        try:

            input_array = [int(x) for x in input_list]
            for x in input_array:
                if (part_len == 0) and (input_str != "-1"):
                    raise ValueError("未键入-1")
                elif (len(input_list) > part_len and (input_str != "-1")):
                    raise ValueError("选择过多")
                elif not (1 <= x <= part_len or x == -1):
                    raise ValueError
                elif(flag_array[x] != 0):
                    raise ValueError("输入重复值")
                flag_array[x] += 1

        except ValueError as e:
            if str(e) == "未键入-1":
                print("您已选择完毕，请输入-1")
            elif str(e) == "选择过多":
                print("当前您最多选择" + str(part_len) + "个骰子")
            elif str(e) == "输入重复值":
                print("请勿多次选择相同的骰子")
            else:
                print("请重新输入，输入1到" + str(part_len) + "之间的整数。")
            input_flag = True

    if input_array[0] != -1:
        for x in input_array:
            player1_lock_list.append(player1_temp_list[x-1])
    show_lock()


def player2_choose():
    part_len = 5 - len(player2_lock_list)
    player2_temp_list = []
    for i in range(part_len):
        player2_temp_list.append(random.randint(1,5))
    print("player2的骰子区：", end="")
    print(player2_temp_list)

    input_array = []
    input_flag = True
    while input_flag:
        input_flag = False
        input_str = input("player2请选择锁定骰子（输入-1表示不锁定）：")
        input_list = input_str.split()
        flag_array = [0, 0, 0, 0, 0, 0]
        try:

            input_array = [int(x) for x in input_list]
            for x in input_array:
                if (part_len == 0) and (input_str != "-1"):
                    raise ValueError("未键入-1")
                elif (len(input_list) > part_len and (input_str != "-1")):
                    raise ValueError("选择过多")
                elif not (1 <= x <= part_len or x == -1):
                    raise ValueError
                elif (flag_array[x] != 0):
                    raise ValueError("输入重复值")
                flag_array[x] += 1

        except ValueError as e:
            if str(e) == "未键入-1":
                print("您已选择完毕，请输入-1")
            elif str(e) == "选择过多":
                print("当前您最多选择" + str(part_len) + "个骰子")
            elif str(e) == "输入重复值":
                print("请勿多次选择相同的骰子")
            else:
                print("请重新输入，输入1到" + str(part_len) + "之间的整数。")
            input_flag = True

    if input_array[0] != -1:
        for x in input_array:
            player2_lock_list.append(player2_temp_list[x-1])
    show_lock()


def player1_multiply():
    global player1_mul
    valid_values = [0, 1, 2, 3]

    while True:
        try:
            x = int(input("player1请选择加倍（输入0, 1, 2, 3）："))
            if x not in valid_values:
                raise ValueError("请输入0, 1, 2, 3之间的整数。")
            break
        except ValueError as e:
            print(e)
    player1_mul += x


def player2_multiply():
    global player2_mul
    valid_values = [0, 1, 2, 3]

    while True:
        try:
            x = int(input("player2请选择加倍（输入0, 1, 2, 3）："))
            if x not in valid_values:
                raise ValueError("请输入0, 1, 2, 3之间的整数。")
            break
        except ValueError as e:
            print(e)
    player2_mul += x


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

def account():
    global player1_point, player2_point

    player1_res = 0
    player2_res = 0
    for x in player1_lock_list:
        player1_res += x
    for x in player2_lock_list:
        player2_res += x
    player1_lock_list_sorted = sorted(player1_lock_list)
    player2_lock_list_sorted = sorted(player2_lock_list)
    player1_res += extra_bonus(player1_lock_list_sorted)
    player2_res += extra_bonus(player2_lock_list_sorted)
    print("player1的牌型为", end="")
    print(player1_lock_list,end="，")
    print("得分为" + str(player1_res) + "，总倍率为" + str(total_mul))
    print("player2的牌型为", end="")
    print(player2_lock_list, end="，")
    print("得分为" + str(player2_res) + "，总倍率为" + str(total_mul))
    dis = player1_res - player2_res
    win_or_lost_point = abs(dis) * total_mul
    if dis > 0:
        player1_point += win_or_lost_point
        player2_point -= win_or_lost_point
        print("player1从player2手中赢得了" + str(win_or_lost_point) + "点筹码！")
    elif dis < 0:
        player1_point -= win_or_lost_point
        player2_point += win_or_lost_point
        print("player2从player1手中赢得了" + str(win_or_lost_point) + "点筹码！")
    elif dis == 0:
        print("player1与player2平局！")

def third_round():
    global player1_lock_list,player2_lock_list
    player1_temp_list = []
    player2_temp_list = []
    while len(player1_lock_list) != 5:
        x = random.randint(1,5)
        player1_temp_list.append(x)
        player1_lock_list.append(x)
    print("player1的骰子区：", end="")
    print(player1_temp_list)
    show_lock()

    while len(player2_lock_list) != 5:
        x = random.randint(1,5)
        player2_temp_list.append(x)
        player2_lock_list.append(x)
    print("player2的骰子区：", end="")
    print(player2_temp_list)
    show_lock()


def main():
    global total_mul
    print("两位玩家当前筹码点值：[" + str(player1_point) + "，" + str(player2_point) + "]")
    for _ in range(2):
        show_lock()
        player1_choose()
        player2_choose()
        player1_multiply()
        player2_multiply()
        print("player1选择加"+str(player1_mul)+"倍率")
        print("player2选择加" + str(player2_mul) + "倍率")
        total_mul = 1 + player1_mul + player2_mul
        print("当前倍率来到"+str(total_mul)+"倍！")

    show_lock()
    third_round()
    account()


if __name__ == '__main__':
    flag = True
    while flag:
        flag = False
        try:
            N = int(input("请输入游戏局数："))
        except ValueError:
            print("请输入一个非负整数")
            flag = True
    for i in range(N):
        init()
        main()
    if player1_point >= player2_point:
        print("第1名：player1，筹码点数：" + str(player1_point))
        print("第2名：player2，筹码点数：" + str(player2_point))
    elif player1_point < player2_point:
        print("第1名：player2，筹码点数：" + str(player2_point))
        print("第2名：player1，筹码点数：" + str(player1_point))
