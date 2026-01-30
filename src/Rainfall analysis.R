library(readxl)
rain <- read_excel("C:/Users/Sai Preetham/Downloads/RAINFALL_FINAL.xlsm")
View(rain)

library(dplyr)

var1 =readline(prompt = "Enter the state : ")
var=toupper(var1);
var

rainfall <- filter(rain,SUBDIVISION == var)
rainfall

state_rainfall <-(rainfall$ANNUAL)

state_rainfall

H <- paste("Histogram of  Annual Rainfall of ", var, sep =" ")
B<-  paste("Bar Graph of  Annual Rainfall of ", var, sep =" ")
P<-  paste("Piechart of  Annual Rainfall of ", var, sep =" ")
L<-  paste("Line Graph of  Annual Rainfall of ", var, sep =" ")
D<-  paste("Density Graph of  Annual Rainfall of ", var, sep =" ")

hist(state_rainfall,
     main=H,
     xlab ="Annual Rainfall in ",
     border = "blue",
     las=0,
     col= "green",
     breaks =10 #number of bins
)

# we will use filter method for selection purpose on some condition


#....................Bar Graph..........................#

barplot(state_rainfall,
        xlab="Year",
        ylab="Annual Rainfall",
        main = B,
        names.arg = rainfall$YEAR,
        col="red",
        border = "black",
        xlim = c(1,20),
)

#....................Pie Chart............................#

piepercent<- round(100*state_rainfall/sum(state_rainfall), 1)
piepercent

final_labels<-paste(piepercent,'%',sep = "")

pie(state_rainfall,
    labels=(final_labels),
    main = P ,
    col=rainbow(length(state_rainfall)),
    radius = 1.1,
)
legend("topright", legend=c(rain$YEAR), cex = 0.6,
       fill = rainbow(length(state_rainfall)))

#................Line Graph................................#
plot(state_rainfall,
     type = "o",  # p - points, l - lines ,o - points+lines 
     xlab="Year ",
     ylab = "Annual Rainfall",
     main = L,
     col="purple",
)

# we can also draw multiple lines here using the lines() 


#......................Density Plot.........................#

d <- density(state_rainfall) # returns the density data
plot(d,main = D)
polygon(d, col="BLUE", border="BLACK")
