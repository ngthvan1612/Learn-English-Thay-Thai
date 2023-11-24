FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-sdk
WORKDIR /app

COPY . .

RUN dotnet restore && \
    dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as runtime-env
ENV TZ="Asia/Ho_Chi_Minh"

COPY --from=build-sdk /app/bin/Release/net6.0/ /app

WORKDIR /app

CMD dotnet LFF.Backend.dll --urls="http://0.0.0.0"
