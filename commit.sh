###
 # @Author: weicong
 # @LastEditors: weicong
 # @Description: 
 # @Date: 2022-03-08 20:18:22
 # @LastEditTime: 2022-03-08 20:18:22
### 
branch = $(git symbolic-ref --short -q HEAD)
echo $branch
git pull origin $branch
git push origin $branch