
def checkint(str):
    try:
        a = int(str)
    except:
        a = False
    return True if a else False


def arithmetic_arranger(arr, want=False):
    if(len(arr) > 5):
        return 'Error: Too many problems.'
    alllist = []
    l1 = ''
    l2 = ''
    l3 = ''
    l4 = ''
    for i in range(len(arr)):
        alllist.append(arr[i].split())
        n1 = alllist[i][0]
        op = alllist[i][1]
        n2 = alllist[i][2]
        if(op not in '+-'):
            return "Error: Operator must be '+' or '-'."
        if(checkint(n1) == False or checkint(n2) == False):
            return "Error: Numbers must only contain digits."
        if((len(str(n1)) > 4) or (len(str(n2)) > 4)):
            return "Error: Numbers cannot be more than four digits."
        spaces = 2 + len(str(max(int(n1), int(n2))))
        l1 += n1.rjust(spaces, ' ')
        l2 += op+n2.rjust(spaces-1, ' ')
        l3 += '-' * spaces
        l4 += str(eval(arr[i])).rjust(spaces, ' ')
        if(i != (len(arr) - 1)):
            l1 += '    '
            l2 += '    '
            l3 += '    '
            l4 += '    '
    if want:
        return l1+'\n'+l2+'\n'+l3+'\n'+l4
    else:
        return l1+'\n'+l2+'\n'+l3


a = arithmetic_arranger(["3 + 855", "3801 - 2", "45 + 43", "123 + 49"])
print(a)

# def arithmetic_arranger(problems):
#     if(len(problems) > 5):
#         return 'Error: Too many problems.'
#     first_line = ''
#     second_line = ''
#     n = len(problems)
#     for i in problems:
#         if('+' in i):
#             splitted = i.split('+')
#             operator = '+'
#         elif('-' in i):
#             splitted = i.split('-')
#             operator = '-'
#         else:
#             return "Error: Operator must be '+' or '-'."

#         first_line += splitted[0].strip()+' '
#         second_line += splitted[1].strip()+' '
#     list1 = first_line.split(' ')
#     list2 = second_line.split(' ')
#     noofspaces = []
#     for i in range(n):
#         noofspaces.append(2 + len(str(max(int(list1[i]), int(list2[i])))))
#     for i in range(n):
#         operator = (c for c in problems[i] if c in '+-/*()_')
#         print(' '*(noofspaces[i]-len(str(list1[i])))+list1[i], end='    ')
#     print()
#     for i in range(n):
#         print('+'+' ' * (noofspaces[i] - 1 -
#                          len(list2[i]))+list2[i], end='    ')
#     print()
#     for i in range(n):
#         print('-' * noofspaces[i], end='    ')
#     print()
#     for i in range(n):
#         print(' '*(noofspaces[i]-len(str(eval(problems[i])))) +
#               str(eval(problems[i])), end='    ')
