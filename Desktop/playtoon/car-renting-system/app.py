import os
from random import randint

# Move to the directory where your Git repository is located
os.chdir('C:/Users/achar/Desktop/playtoon/car-renting-system')

# Loop through 365 days
for i in range(1, 366):
    for j in range(0, randint(1, 10)):
        d = str(i) + ' days ago'
        with open('files.txt', 'a') as file:
            file.write(d)
        os.system('git add .')
        os.system('git commit --date "' + d + '" -m "commit"')

# After committing all changes, push to the remote repository
os.system('git push -u origin main')
