FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-sdk
WORKDIR /app

COPY . .

RUN rm -rf ./tmp && dotnet restore && \
    dotnet publish -c Release -o out && \
    dotnet tool install --global dotnet-ef --version 6.* && \
    dotnet tool restore && \
    export PATH="$PATH:/root/.dotnet/tools" && \
    dotnet ef migrations bundle -r linux-x64 --force

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as runtime-env
ENV TZ="Asia/Ho_Chi_Minh"

COPY --from=build-sdk /app/bin/Release/net6.0/ /app
COPY --from=build-sdk /app/efbundle /app/efbundle

WORKDIR /app

CMD ./efbundle && \
    dotnet LFF.Backend.dll --urls="http://0.0.0.0"
