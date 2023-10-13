# 初始算法_人机对战
import random
import pandas
import itertools

player_lock_list = []    # 存储玩家1锁定区
AI_lock_list = []    # 存储人机锁定区
player_mul = 0   # 玩家1的倍数
AI_mul = 0   # 人机的倍数
total_mul = 1   # 总倍数
player_point = 1000
AI_point = 1000
expect_list = []

def init():
    global player_lock_list,AI_lock_list,player_mul,AI_mul,total_mul
    player_lock_list = []    # 存储玩家1锁定区
    AI_lock_list = []    # 存储人机锁定区
    player_mul = 0   # 玩家1的倍数
    AI_mul = 0   # 人机的倍数
    total_mul = 1   # 总倍数

def show_lock():
    print("两位玩家的锁定区： [", end="")
    print(player_lock_list, end="，")
    print(AI_lock_list,end="")
    print("]")

def cal_expect():

    excel_path = '期望.xlsx'
    fd = pandas.read_excel(excel_path)

    x = fd['期望']
    for i in x:
        expect_list.append(i)

def player_choose():
    part_len = 5 - len(player_lock_list)
    player_temp_list = []
    for i in range(part_len):
        player_temp_list.append(random.randint(1,5))
    print("player的骰子区：",end="")
    print(player_temp_list)

    input_array = []
    input_flag = True
    while input_flag:
        input_flag = False
        input_str = input("player请选择锁定骰子（输入-1表示不锁定）：")
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
            player_lock_list.append(player_temp_list[x-1])
    show_lock()


def AI_choose():
    global AI_lock_list
    part_len = 5 - len(AI_lock_list)
    AI_temp_list = []
    for i in range(part_len):
        AI_temp_list.append(random.randint(1, 5))
    print("AI的骰子区：", end="")
    print(AI_temp_list)
    all_possiblies = []
    for i in range(part_len + 1):
        possibly = itertools.combinations(AI_temp_list, i)  # 生成i个骰子的组合
        all_possiblies.extend(possibly)
    init_index = 0
    for i in AI_lock_list:
        init_index = init_index * 6 + i
    max_value = 0
    temp_list = []
    for possibly in all_possiblies:
        current_index = init_index
        for i in possibly:
            current_index = current_index * 6 + i
        if expect_list[current_index] > max_value:
            max_value = expect_list[current_index]
            max_index = current_index
            temp_list = possibly
    AI_lock_list += temp_list

    show_lock()



def player_multiply():
    global player_mul
    valid_values = [0, 1, 2, 3]

    while True:
        try:
            x = int(input("player请选择加倍（输入0, 1, 2, 3）："))
            if x not in valid_values:
                raise ValueError("请输入0, 1, 2, 3之间的整数。")
            break
        except ValueError as e:
            print(e)
    player_mul += x


def AI_multiply():
   global AI_mul
   AI_index = 0
   for i in AI_lock_list:
       AI_index = AI_index * 6 + i
   player_index = 0
   for i in player_lock_list:
       player_index = player_index * 6 + i
   if(expect_list[AI_index] > expect_list[player_index]):
       AI_mul += 3

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
    global player_point, AI_point

    player_res = 0
    AI_res = 0
    for x in player_lock_list:
        player_res += x
    for x in AI_lock_list:
        AI_res += x
    player_lock_list_sorted = sorted(player_lock_list)
    AI_lock_list_sorted = sorted(AI_lock_list)
    player_res += extra_bonus(player_lock_list_sorted)
    AI_res += extra_bonus(AI_lock_list_sorted)
    print("player的牌型为", end="")
    print(player_lock_list,end="，")
    print("得分为" + str(player_res) + "，总倍率为" + str(total_mul))
    print("AI的牌型为", end="")
    print(AI_lock_list, end="，")
    print("得分为" + str(AI_res) + "，总倍率为" + str(total_mul))
    dis = player_res - AI_res
    win_or_lost_point = abs(dis) * total_mul
    if dis > 0:
        player_point += win_or_lost_point
        AI_point -= win_or_lost_point
        print("player从AI手中赢得了" + str(win_or_lost_point) + "点筹码！")
    elif dis < 0:
        player_point -= win_or_lost_point
        AI_point += win_or_lost_point
        print("AI从player手中赢得了" + str(win_or_lost_point) + "点筹码！")
    elif dis == 0:
        print("player与AI平局！")

def third_round():
    global player_lock_list,AI_lock_list
    player_temp_list = []
    AI_temp_list = []

    while len(AI_lock_list) != 5:
        x = random.randint(1,5)
        AI_temp_list.append(x)
        AI_lock_list.append(x)
    print("AI的骰子区：", end="")
    print(AI_temp_list)
    show_lock()

    while len(player_lock_list) != 5:
        x = random.randint(1,5)
        player_temp_list.append(x)
        player_lock_list.append(x)
    print("player的骰子区：", end="")
    print(player_temp_list)
    show_lock()

def main():
    global total_mul
    print("两位玩家当前筹码点值：[" + str(player_point) + "，" + str(AI_point) + "]")
    for _ in range(2):
        show_lock()
        AI_choose()
        player_choose()
        AI_multiply()
        player_multiply()
        print("player选择加"+str(player_mul)+"倍率")
        print("AI选择加" + str(AI_mul) + "倍率")
        total_mul = 1 + player_mul + AI_mul
        print("当前倍率来到"+str(total_mul)+"倍！")

    show_lock()
    third_round()
    account()


if __name__ == '__main__':
    cal_expect()
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
    if player_point >= AI_point:
        print("第1名：player，筹码点数：" + str(player_point))
        print("第2名：AI，筹码点数：" + str(AI_point))
    elif player_point < AI_point:
        print("第1名：AI，筹码点数：" + str(AI_point))
        print("第2名：player，筹码点数：" + str(player_point))
