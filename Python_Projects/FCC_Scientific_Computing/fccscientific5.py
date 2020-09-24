import copy
import random
# Consider using the modules imported above.


class Hat:
    def __init__(self, **kwargs):
        finalstr = ''
        for key, value in kwargs.items():
            str1 = str(key)+' '
            str2 = value
            finalstr += str1 * str2
        self.contents = finalstr.split()

    def draw(self, number):
        draw_list = []
        if(number > len(self.contents)):
            return self.contents
        for i in range(number):
            randomchoice = random.choice(self.contents)
            draw_list.append(randomchoice)
            self.contents.remove(randomchoice)
        return draw_list


hat1 = Hat(yellow=3, blue=2, green=6)


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    resultspassed = 0
    convert_this = ''
    for key, value in expected_balls.items():
        str1 = str(key) + ' '
        convert_this += str1 * int(value) + ' '
    convert_this = convert_this.split()
    for i in range(num_experiments):
        contentscopy = copy.copy(hat.contents)
        drewn_list = hat.draw(num_balls_drawn)
        count = 0
        for i in convert_this:
            if(i in drewn_list):
                drewn_list.remove(i)
                count += 1
        if(count == len(convert_this)):
            resultspassed += 1
        hat.contents = copy.copy(contentscopy)
    return resultspassed/num_experiments


hat = Hat(blue=3, red=2, green=6)
print(experiment(hat=hat, expected_balls={
    "blue": 2, "green": 1}, num_balls_drawn=4, num_experiments=1000)
)
